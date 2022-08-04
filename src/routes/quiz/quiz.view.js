const axios = require('axios')

module.exports = async(req, res) => {
    const slug = req.params.slug

    const query = `
      query quizBySlug($slug: String!) {
        quizBySlug(slug: $slug) {
          id,
          title,
          description,
          slug,
          userId,
          avgScore,
          questions {
            id,
            title,
            order,
            correctAnswer
          }
        }
      }
    `

    try {
      const { data } = await axios.post('http://localhost:3000/graphql', 
        {
          query: query,
          variables: {
            slug: slug
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const quiz = data.data.quizBySlug
      res.render('quiz', { quiz, user: req.verifiedUser })
    }
    catch (err) {
      console.log(err)
      res.redirect('/')
    }
}