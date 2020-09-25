import React from "react";
import styles from "./Kraken.module.scss";

type NodeType = "line" | "node";
type Color = "pink" | "green" | "blue" | "yellow";

function Kraken() {
  return (
    <div className={styles.wrapper}>
      <Branch color="green" horizontalGap={2} verticalGap={13} level={1}>
        {renderNodes(["line", "node", "line", "node", "line"])}
      </Branch>

      <Branch color="yellow" horizontalGap={1} verticalGap={7}>
        {renderNodes(["line", "node", "line"])}
      </Branch>
      <Branch color="pink" horizontalGap={1} verticalGap={11}>
        {renderNodes([
          "line",
          "node",
          "line",
          "line",
          "line",
          "line",
          "line",
          "node",
          "line",
        ])}
      </Branch>
      <Branch color="blue" horizontalGap={0} verticalGap={0}>
        {renderNodes([
          "line",
          "line",
          "line",
          "line",
          "node",
          "line",
          "node",
          "line",
          "node",
          "line",
          "node",
          "line",
          "node",
          "line",
          "node",
          "line",
          "node",
          "line",
          "node",
          "line",
          "node",
          "line",
          "line",
          "line",
          "line",
          "line",
        ])}
      </Branch>
      <Branch color="pink" horizontalGap={1} verticalGap={5} right>
        {renderNodes(["line", "node", "line"])}
      </Branch>
    </div>
  );

  function renderNodes(nodeTypes: NodeType[]) {
    return nodeTypes.map((nodeType, i) => (
      <div className={styles[nodeType]} key={i} />
    ));
  }
}

function Branch({
  color,
  children,
  right,
  horizontalGap = 0,
  verticalGap = 0,
  level = 0,
}: {
  color: Color;
  children: React.ReactNode;
  right?: boolean;
  horizontalGap?: number;
  verticalGap?: number;
  level?: number;
}) {
  const translateXOffset =
    (right ? 1 : -1) * ((right ? horizontalGap - 1 : horizontalGap) * 24) -
    1 -
    (!right && horizontalGap ? 8 : 0);
  return (
    <div
      className={`${styles.branch} ${styles[color]} ${
        styles[right ? "right" : "left"]
      }`}
      style={{
        width: (horizontalGap - level) * 16,
        transform: `translateX(calc(50% + ${translateXOffset}px))`,
        marginTop: verticalGap * 16,
      }}
    >
      {children}
    </div>
  );
}

export default Kraken;
