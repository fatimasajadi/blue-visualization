import React, { useState } from "react";
import styles from "./Tree.module.scss";
import { ReactComponent as CaretRight } from "./icons/caret-right-solid.svg";
import { ReactComponent as FolderSolid } from "./icons/folder-solid.svg";
import { ReactComponent as FolderOpenSolid } from "./icons/folder-open-solid.svg";

export interface Item {
  title: string;
  children?: Item[];
}

interface Props {
  items: Item[];
}

function Tree({ items }: Props) {
  return <Subtree items={items} level={0} />;
}

function Subtree({ items, level }: { items: Item[]; level: number }) {
  return (
    <>
      {items.map((item, i) => (
        <Item key={`item_${i}`} item={item} level={level} />
      ))}
    </>
  );
}

function Item({ item, level }: { item: Item; level: number }) {
  const [isOpen, setIsOpen] = useState(level === 0);

  return (
    <div className={styles.subtreeWrapper}>
      <div
        className={styles.titleWrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {!item.children && <CaretRight />}
        {item.children && (!isOpen ? <FolderSolid /> : <FolderOpenSolid />)}
        <div className={styles.title}>{item.title}</div>
      </div>

      {item.children && (
        <div
          className={`${styles.children} ${
            isOpen ? styles.open : styles.collapsed
          }`}
        >
          <Subtree items={item.children} level={level + 1} />
        </div>
      )}
    </div>
  );
}

export default Tree;
