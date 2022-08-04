const axios = require('axios')

module.exports = async (req, res) => {
    const quizInputs = req.body

    const quizData = {
        title: quizInputs.quizTitle,
        description: quizInputs.quizDescription,
        userId: req.verifiedUser.id,
        questions: []
    }

    for (const key in quizInputs) {
        if (key.includes('questionTitle')) {
            const questionNum = parseInt(key.replace('questionTitle', ''))

            while(!quizData.questions[questionNum]) {
                quizData.questions.push({})
            }

            quizData.questions[questionNum].title = quizInputs[key]
        } else if (key.includes('questionAnswer')) {
            const questionNum = parseInt(key.replace('questionAnswer', ''))

            while(!quizData.questions[questionNum]) {
                quizData.questions.push({})
            }

            quizData.questions[questionNum].correctAnswer = quizInputs[key]
            quizData.questions[questionNum].order = questionNum
        }
    }

    const mutation = `
        mutation createQuiz($userId: String!, $title: String!, $description: String!, $questions: [QuestionInput!]!) {
            createQuiz(userId: $userId, title: $title, description: $description, questions: $questions)
        }
    `

    try {
        const { data } = await axios.post('http://localhost:3000/graphql',
            {
                query: mutation,
                variables: quizData
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        const slug = data.data.createQuiz

        res.redirect('/quiz/success/' + slug)
    }
    catch(err) {
        console.log(err)
        res.redirect('/quiz/create')
    }
}