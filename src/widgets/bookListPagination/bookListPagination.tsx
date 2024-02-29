import { FC } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import clsx from 'clsx'
import { BookPreview } from 'entities/book/bookPreview/ui'
import { IBookPreview } from 'shared/api'

import './bookListPagination.scss'

interface IBookListPagination {
    /** Books for rendering on the page. */
    books: IBookPreview[] | null
    /** Total book count for all pages. */
    totalCountBooks: number
    /** Current active page. */
    currentPage: number
    /** Additional styles. */
    className?: string

    /**
     * Books for drawing on the page.
     * @param newPage - The page to go to.
     *  */
    onChangePage: (newPage: number) => void
}

export const BookListPagination: FC<IBookListPagination> = (props) => {
    const { books, onChangePage, totalCountBooks, currentPage, className } =
        props
    const totalPage = Math.ceil(totalCountBooks / 20)

    const renderBooks = (items: IBookPreview[] | null) => {
        return items?.map((item) => (
            <BookPreview
                key={item.isbn13}
                isbn13={item.isbn13}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
            />
        ))
    }
    return (
        <div className={clsx('book-list-pagination', className)}>
            <div className='book-list-pagination__content'>
                {renderBooks(books)}
            </div>
            <ResponsivePagination
                current={currentPage}
                total={totalPage}
                onPageChange={onChangePage}
                maxWidth={500}
                previousLabel='« Previous'
                nextLabel='Next »'
                className='book-list-pagination__pag'
            />
        </div>
    )
}