const axios = require('axios')

module.exports = async (req, res) => {
    
    const variables = {
        quizId: req.body.quizId,
        userId: req.verifiedUser.id,
        answers: []
    }

    for (const key in req.body) {
        if (key !== 'quizId') {
            variables.answers.push({
                questionId: key,
                answer: req.body[key]
            })
        }
    }

    const mutation = `
        mutation submitQuiz($userId: String!, $quizId: String!, $answers: [AnswerInput!]!) {
            submitQuiz(userId: $userId, quizId: $quizId, answers: $answers)
        }
    `

    try {
        const { data } = await axios.post('http://localhost:3000/graphql',
            {
                query: mutation,
                variables: variables
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log(data)
        const submissionId = data.data.submitQuiz
        res.redirect('/quiz/results/' + submissionId)
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
}