module.exports = class AdObject {
    constructor(title, description, author, category, tagArray, price, addDate) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.category = category;
        this.tagArray = tagArray;
        this.price = price;
        this.addDate = addDate;
    }
}
