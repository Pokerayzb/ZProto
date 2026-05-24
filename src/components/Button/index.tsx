import type { ButtonHTMLAttributes, ReactNode } from "react";

import "./index.css";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: ReactNode;
  active?: boolean;
};

export function Button({
  children,
  active = false,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const rootClass = ["button", active ? "active" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={rootClass} type={type} {...rest}>
            <span className="tl" aria-hidden />
            <span className="t" aria-hidden />
            <span className="tr" aria-hidden />
            <span className="l" aria-hidden />
            <span className="content">{children}</span>
            <span className="r" aria-hidden />
            <span className="bl" aria-hidden />
            <span className="b" aria-hidden />
            <span className="br" aria-hidden />
        </button>
    );
}
