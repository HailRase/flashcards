import {FC, MouseEvent} from "react";

import s from "./pagination.module.css"

interface Props {
    currentPage: number;
    maxPage: number;
    onChange: (page: number) => void;
    itemsPerPage: number;
}

const Pagination: FC<Props> = ({currentPage, maxPage, onChange, itemsPerPage}) => {
    const numberOfButtons = 5;
    const halvedNumOfButtons = Math.floor(numberOfButtons / 2);


    // Events
    const onPreviousPage = () => {
        currentPage > 0 && onChange(currentPage - 1);
    }

    const onChangePage = (e: MouseEvent<HTMLButtonElement>) => {
        const page = +(e.currentTarget.dataset.page || 0);
        page !== currentPage && page && onChange(page);
    }

    const onNextPage = () => {
        currentPage < maxPage && onChange(currentPage + 1);
    }

    // Construct page buttons
    let pageButtonIndexes: number[] = [];

    if (currentPage + halvedNumOfButtons > numberOfButtons) {
        // First Page Button
        pageButtonIndexes.push(1);
    }

    if (currentPage <= halvedNumOfButtons) {
        // Pagination start
        for (let i = 1; i <= numberOfButtons && i <= maxPage; i++) {
            pageButtonIndexes.push(i);
        }
    } else if (currentPage + halvedNumOfButtons >= maxPage) {
        for (let i = currentPage - numberOfButtons; i <= maxPage; i++) {
            pageButtonIndexes.push(i);
        }
    } else {
        for (let i = currentPage - halvedNumOfButtons; i <= currentPage + halvedNumOfButtons; i++) {
            // Pagination Middle
            pageButtonIndexes.push(i);
        }
    }

    if (currentPage + halvedNumOfButtons < maxPage) {
        // Last Page Button
        pageButtonIndexes.push(maxPage);
    }

    if (maxPage < numberOfButtons) {
        pageButtonIndexes = [];
        for (let i = 1; i <= maxPage; i++) {
            pageButtonIndexes.push(i)
        }
    }

    const pageButtons = pageButtonIndexes.map(index => {
        return (<button
            key={`page-button-${index}`}
            data-page={index}
            onClick={onChangePage}
            className={`${s.button} ${index === currentPage && s.button_active}`}>{index}</button>)
    });

    return <div className={s.container}>
        <button className={`${s.button} ${s.arrow}`}
                disabled={currentPage === 1}
                onClick={onPreviousPage}>Previous
        </button>
        {pageButtons}
        <button className={`${s.button} ${s.arrow}`}
                disabled={currentPage === maxPage}
                onClick={onNextPage}>Next
        </button>
    </div>
}

export default Pagination