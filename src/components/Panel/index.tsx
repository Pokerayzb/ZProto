import type { ReactNode } from "react";

import "./index.css";

export type PanelLayout = "horizontal" | "vertical";

export type PanelProps = {
  children: ReactNode;
  layout?: PanelLayout;
  className?: string;
};

export function Panel({ children, layout = "horizontal", className }: PanelProps) {
    const layoutClass = layout === "vertical" ? "vertical" : "horizontal";
    const rootClass = ["panel", layoutClass, className].filter(Boolean).join(" ");

    return (
        <div className={rootClass}>
            <span className="tl" aria-hidden />
            <span className="t" aria-hidden />
            <span className="tr" aria-hidden />
            <span className="l" aria-hidden />
            <div className="content">
                <div className="background"></div>
                <div className="inner">
                    {children}
                </div>
            </div>
            <span className="r" aria-hidden />
            <span className="bl" aria-hidden />
            <span className="b" aria-hidden />
            <span className="br" aria-hidden />
        </div>
    );
}
