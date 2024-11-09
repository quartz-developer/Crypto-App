//CSS
import styles from "./Paginaion.module.css";

function Pagination({ page, setPage}) {

    const previousHandler = () => {
        if (page <= 1) return;
        setPage((page) => page - 1);
    }

    const nextHandler = () => {
        if (page >= 10) return;
        setPage((page) => page + 1);
    }

    return (
        <div className={styles.pagination}>
            <button onClick={previousHandler} className={page ===1 ? styles.disable : null}> previous </button>
            <p className={page ===1 ? styles.slected : null}> 1 </p>
            <p className={page ===2 ? styles.slected : null}> 2 </p>
            {
                page > 2 && page < 9 && (
                    <>
                        <span>...</span>
                        <p className={styles.slected}>{page}</p>
                    </>
                )
            }
            <span> ... </span>
            <p className={page ===9 ? styles.slected : null}> 9 </p>
            <p className={page ===10 ? styles.slected : null}> 10 </p>
            <button onClick={nextHandler} className={page ===10 ? styles.disable : null}> next </button>
        </div>
    );
}

export default Pagination;