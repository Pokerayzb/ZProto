import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { Layout } from "@components/shared";

import "./index.css";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: ReactNode;
  active?: boolean;
  layout?: Layout;
};

export function Button({
  children,
  active = false,
  layout = "horizontal",
  ...rest
}: ButtonProps) {
  return (
    <button className={"button " + layout + (active ? " active" : "")} type="button" {...rest}>
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
