const axios = require('axios')

module.exports = async(req, res) => {
    const query = `
        query submissionById($id: String!) {
            submissionById(id: $id) {
                quiz {
                    title
                },
                score
            }
        }
    `

    try {
        const { data } = await axios.post('http://localhost:3000/graphql',
            {
                query: query,
                variables: {
                    id: req.params.id
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const submission = data.data.submissionById

        res.render('quiz-results', { submission })
    }
    catch(err) {
        res.redirect('/')
    }
}