import {FC} from "react";

import s from "./pagination.module.css"

interface Props {
    currentPage: number;
    maxPage: number;
    onChange: (page: number) => void;
    itemsPerPage: number;
}

const Pagination: FC<Props> = ({currentPage, maxPage, onChange, itemsPerPage}) => {

    const onPreviousPage = () => {
        currentPage > 0 && onChange(currentPage - 1);
    }

    const onNextPage = () => {
        currentPage < maxPage && onChange(currentPage + 1);
    }

    return <div className={s.container}>
        <div className={s.arrow} onClick={onPreviousPage}>Previous</div>
        <div className={s.arrow} onClick={onNextPage}>Next</div>
    </div>
}

export default Pagination