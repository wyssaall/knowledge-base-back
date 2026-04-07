import Article from "../models/article.model"


const getAllArticles = (req, res) => {
    let articles = Article.find()
    res.status(200).json(articles)

}

const getOneArticle = (req, res) => {
    let article = Article.findById(req.params.id)
    res.status(200).json(article)
}

export { getAllArticles, getOneArticle }
