class Ratings {

    static get(bookId) {
        if (this.hasItem(bookId)) {
            return localStorage.getItem(this.key(bookId));
        }

        return null;
    }

    static set(bookId, rating) {
        localStorage.setItem(this.key(bookId), rating);
    }

    static key(bookId) {
        return `rating-${bookId}`;
    }

    static hasItem(bookId) {
        return localStorage.getItem(this.key(bookId));
    }

}

export default Ratings;