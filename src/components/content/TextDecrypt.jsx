import React, { useEffect, useState } from "react";

const chars = "-./*!?#%&@$€()[]{}<>~0123456789abcdefghijklmnopqrstuvwxyz".split("");
const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

export const TextDecrypt = ({ text = "" }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        if (!text) {
            setDisplay("");
            return;
        }

        let frame = 0;
        let cancelled = false;
        const target = text.split("");

        const update = () => {
            if (cancelled) return;

            const next = target.map((char, index) => {
                if (index < frame) return char;
                return getRandomChar();
            });

            setDisplay(next.join(""));

            if (frame < target.length) {
                frame += 1;
                setTimeout(update, 50);
            }
        };

        update();

        return () => {
            cancelled = true;
        };
    }, [text]);

    return (
        <p>
          {display}
          {" "}
        </p>
    );
};
