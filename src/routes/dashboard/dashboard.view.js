module.exports = (req, res) => {
    const data = {
        "user": {
          "id": "62ea8ccc9d2e4d017ec47a03",
          "username": "psmith",
          "email": "psmith@gmail.com",
          "quizzes": [
            {
              "id": "62ea99769dfe80c13143c07a",
              "slug": "this-is-a-new-quiz-9323",
              "title": "This is a new quiz",
              "description": "This is our amazing quiz, have fun!",
              "avgScore": 49.99999999999999,
              "questions": [
                {
                  "id": "62ea99779dfe80c13143c07d",
                  "title": "What's 9+10?",
                  "correctAnswer": "19"
                },
                {
                  "id": "62ea99779dfe80c13143c07c",
                  "title": "What's the square root of -1",
                  "correctAnswer": "Nice try"
                },
                {
                  "id": "62ea99779dfe80c13143c07e",
                  "title": "What's 10+11?",
                  "correctAnswer": "21"
                }
              ],
              "submissions": [
                {
                  "userId": "62e96c4d80cbcd6c9e06c768",
                  "score": 66.66666666666666
                },
                {
                  "userId": "62e96c4d80cbcd6c9e06c768",
                  "score": 33.33333333333333
                }
              ]
            }
          ],
          "submissions": []
        }
      }

    res.render('dashboard', data)
}