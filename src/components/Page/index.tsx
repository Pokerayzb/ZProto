import type { ReactNode } from "react";

import backgroundSrc from "../../../concept/background.png";

import "./index.css";

export type PageProps = {
    children?: ReactNode;
    className?: string;
};

export function Page({ children, className }: PageProps) {
    const rootClass = ["page", className].filter(Boolean).join(" ");

    return (
        <div className={rootClass}>
            <div className="page__background" aria-hidden>
                <img src={backgroundSrc} alt="" decoding="async" fetchPriority="high" />
            </div>
            <div className="page__content">{children}</div>
        </div>
    );
}
