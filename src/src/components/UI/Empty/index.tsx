import styles from "./empty.module.css";

type Props = {
  title: string;
  text: string;
  loading: boolean;
};

const Empty = ({ title, text, loading }: Props) => {
  return (
    <div className={`${loading ? styles.hide : ""} ${styles.empty}`}>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Empty;
