import React, { useEffect, useRef, useContext, useState } from "react";
import classNames from "classnames";
import {
    Vector2,
    Color,
    sRGBEncoding,
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    DirectionalLight,
    AmbientLight,
    UniformsUtils,
    UniformsLib,
    MeshPhongMaterial,
    IcosahedronBufferGeometry,
    SphereBufferGeometry,
    TorusKnotBufferGeometry,
    BoxBufferGeometry,
    CylinderBufferGeometry,
    DodecahedronBufferGeometry,
    TetrahedronBufferGeometry,
    Mesh,
} from "three";
import { spring, value } from "popmotion";
import innerHeight from "ios-inner-height";
import vertShader from "./sphereVertShader";
import fragShader from "./sphereFragShader";
import { Transition } from "react-transition-group";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useInViewport } from "../../hooks/useInViewport";
import { reflow } from "../../utils/transition";
import { media, rgbToThreeColor } from "../../utils/style";
import { cleanScene, removeLights, cleanRenderer } from "../../utils/three";
import "./DisplacementSphere.css";
import { ThemeContext } from "../theme/ThemeProvider";

const createShapeGeometry = (type, seed) => {
    const random = seed || Math.random();
    const radius = 24 + random * 12;
    const detail = 1 + Math.floor(random * 3);

    switch (type) {
        case "sphere":
            return new SphereBufferGeometry(radius, 128, 128);
        case "torusKnot":
            return new TorusKnotBufferGeometry(
                radius * 0.65,
                radius * 0.2,
                128,
                32,
                3 + detail,
                2 + detail
            );
        case "box":
            return new BoxBufferGeometry(radius, radius, radius);
        case "cylinder":
            return new CylinderBufferGeometry(
                radius * 0.7,
                radius * 0.7,
                radius * 1.4,
                64
            );
        case "dodecahedron":
            return new DodecahedronBufferGeometry(radius, detail);
        case "tetrahedron":
            return new TetrahedronBufferGeometry(radius, detail);
        case "icosahedron":
        default:
            return new IcosahedronBufferGeometry(radius, 3 + detail);
    }
};

const createRenderer = (canvas) => {
    if (!canvas) return null;

    try {
        const context =
            canvas.getContext("webgl", {
                antialias: false,
                alpha: true,
                depth: true,
                stencil: false,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false,
            }) ||
            canvas.getContext("experimental-webgl", {
                antialias: false,
                alpha: true,
                depth: true,
                stencil: false,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false,
            });

        if (!context) return null;

        return new WebGLRenderer({
            canvas,
            context,
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
            failIfMajorPerformanceCaveat: false,
        });
    } catch (error) {
        return null;
    }
};

const DisplacementSphere = (props) => {
    const { theme, shapeType, shapeSeed, themePalette } = useContext(ThemeContext);
    const [webglEnabled, setWebglEnabled] = useState(true);
    const width = useRef(window.innerWidth);
    const height = useRef(window.innerHeight);
    const start = useRef(Date.now());
    const canvasRef = useRef();
    const mouse = useRef();
    const renderer = useRef();
    const camera = useRef();
    const scene = useRef();
    const lights = useRef();
    const uniforms = useRef();
    const material = useRef();
    const geometry = useRef();
    const sphere = useRef();
    const tweenRef = useRef();
    const sphereSpring = useRef();
    const prefersReducedMotion = Boolean(usePrefersReducedMotion() && false); //disabled until switching themes fixed
    const isInViewport = useInViewport(canvasRef);

    useEffect(() => {
        mouse.current = new Vector2(0.8, 0.5);

        renderer.current = createRenderer(canvasRef.current);
        if (!renderer.current) {
            // Graceful fallback: keep app usable if WebGL is unavailable.
            setWebglEnabled(false);
            return undefined;
        }
        renderer.current.setSize(width.current, height.current);
        renderer.current.setPixelRatio(1);
        renderer.current.outputEncoding = sRGBEncoding;

        camera.current = new PerspectiveCamera(
            55,
            width.current / height.current,
            0.1,
            200
        );
        camera.current.position.z = 52;

        scene.current = new Scene();

        material.current = new MeshPhongMaterial({
            shininess: 22,
        });
        material.current.onBeforeCompile = (shader) => {
            uniforms.current = UniformsUtils.merge([
                UniformsLib["ambient"],
                UniformsLib["lights"],
                shader.uniforms,
                { time: { type: "f", value: 0 } },
            ]);

            shader.uniforms = uniforms.current;
            shader.vertexShader = vertShader;
            shader.fragmentShader = fragShader;
            shader.lights = true;
        };

        geometry.current = new IcosahedronBufferGeometry(30, 4);

        sphere.current = new Mesh(geometry.current, material.current);
        sphere.current.position.z = 0;
        sphere.current.modifier = Math.random();
        scene.current.add(sphere.current);

        return () => {
            cleanScene(scene.current);
            cleanRenderer(renderer.current);
        };
    }, []);

    useEffect(() => {
        if (!webglEnabled || !scene.current) return undefined;

        const dirLight = new DirectionalLight(
            rgbToThreeColor("250 250 250"),
            0.6
        );
        const ambientLight = new AmbientLight(
            rgbToThreeColor("250 250 250"),
            theme === "light" || theme === "custom" ? 0.75 : 0.15
        );

        dirLight.position.z = 200;
        dirLight.position.x = 100;
        dirLight.position.y = 100;

        lights.current = [dirLight, ambientLight];
        scene.current.background = new Color(
            theme === "dark" ? "#111111" : theme === "custom" ? "#fff7ef" : "#fafafa"
        );
        lights.current.forEach((light) => scene.current.add(light));

        return () => {
            removeLights(lights.current);
        };
    }, [theme, webglEnabled]);

    useEffect(() => {
        if (!webglEnabled || !renderer.current || !camera.current || !sphere.current || !canvasRef.current) {
            return undefined;
        }

        const handleResize = () => {
            const canvasHeight = innerHeight();
            const windowWidth = window.innerWidth;
            const fullHeight = canvasHeight + canvasHeight * 0.3;
            canvasRef.current.style.height = fullHeight;
            renderer.current.setSize(windowWidth, fullHeight);
            camera.current.aspect = windowWidth / fullHeight;
            camera.current.updateProjectionMatrix();

            // Render a single frame on resize when not animating
            if (prefersReducedMotion) {
                renderer.current.render(scene.current, camera.current);
            }

            if (windowWidth <= media.mobile) {
                sphere.current.position.x = 14;
                sphere.current.position.y = 10;
            } else if (windowWidth <= media.tablet) {
                sphere.current.position.x = 18;
                sphere.current.position.y = 14;
            } else {
                sphere.current.position.x = 22;
                sphere.current.position.y = 16;
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [prefersReducedMotion, webglEnabled]);

    useEffect(() => {
        if (!webglEnabled || !sphere.current) return undefined;

        const onMouseMove = (event) => {
            const { rotation } = sphere.current;

            const position = {
                x: event.clientX / window.innerWidth,
                y: event.clientY / window.innerHeight,
            };

            if (!sphereSpring.current) {
                sphereSpring.current = value(rotation.toArray(), (values) =>
                    rotation.set(
                        values[0],
                        values[1],
                        sphere.current.rotation.z
                    )
                );
            }

            tweenRef.current = spring({
                from: sphereSpring.current.get(),
                to: [position.y / 2, position.x / 2],
                stiffness: 30,
                damping: 20,
                velocity: sphereSpring.current.getVelocity(),
                mass: 2,
                restSpeed: 0.0001,
            }).start(sphereSpring.current);
        };

        if (!prefersReducedMotion && isInViewport) {
            window.addEventListener("mousemove", onMouseMove);
        }

        return () => {
            window.removeEventListener("mousemove", onMouseMove);

            if (tweenRef.current) {
                tweenRef.current.stop();
            }
        };
    }, [isInViewport, prefersReducedMotion, webglEnabled]);

    useEffect(() => {
        if (!webglEnabled || !themePalette || !renderer.current || !sphere.current) return undefined;

        const themeColor =
            theme === "dark"
                ? themePalette.secondary?.main || themePalette.primary.main
                : theme === "custom"
                ? themePalette.accent?.main || themePalette.primary.main
                : themePalette.primary?.main;

        if (material.current) {
            material.current.color.set(themeColor);
            material.current.emissive.set(themeColor).multiplyScalar(0.08);
            material.current.needsUpdate = true;
        }

        if (sphere.current && shapeType && typeof shapeSeed === "number") {
            const newGeometry = createShapeGeometry(shapeType, shapeSeed);
            if (sphere.current.geometry) {
                sphere.current.geometry.dispose();
            }
            sphere.current.geometry = newGeometry;
            geometry.current = newGeometry;
            sphere.current.modifier = shapeSeed;
        }

        let animation;

        const animate = () => {
            animation = requestAnimationFrame(animate);

            if (uniforms.current !== undefined) {
                uniforms.current.time.value =
                    0.00005 * (Date.now() - start.current);
            }

            sphere.current.rotation.z += 0.001;
            renderer.current.render(scene.current, camera.current);
        };

        if (!prefersReducedMotion && isInViewport) {
            animate();
        } else {
            renderer.current.render(scene.current, camera.current);
        }

        return () => {
            cancelAnimationFrame(animation);
        };
    }, [theme, themePalette, shapeType, shapeSeed, isInViewport, prefersReducedMotion, webglEnabled]);

    if (!webglEnabled) {
        return (
            <div
                aria-hidden
                className="displacement-sphere-fallback"
                {...props}
            />
        );
    }

    return (
        <Transition appear in onEnter={reflow} timeout={3000}>
            {(status) => (
                <canvas
                    aria-hidden
                    className={classNames(
                        "displacement-sphere",
                        `displacement-sphere--${status}`
                    )}
                    ref={canvasRef}
                    {...props}
                />
            )}
        </Transition>
    );
};

export default DisplacementSphere;
