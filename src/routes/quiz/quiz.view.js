module.exports = (req, res) => {
    const data = {
        "quiz": {
          "id": "62ea99769dfe80c13143c07a",
          "title": "This is a new quiz",
          "description": "This is our amazing quiz, have fun!",
          "userId": "62ea8ccc9d2e4d017ec47a03",
          "avgScore": 44.444444444444436,
          "questions": [
            {
              "id": "62ea99779dfe80c13143c07d",
              "title": "What's 9+10?",
              "order": 2,
              "correctAnswer": "19"
            },
            {
              "id": "62ea99779dfe80c13143c07c",
              "title": "What's the square root of -1",
              "order": 1,
              "correctAnswer": "Nice try"
            },
            {
              "id": "62ea99779dfe80c13143c07e",
              "title": "What's 10+11?",
              "order": 3,
              "correctAnswer": "21"
            }
          ]
        }
      }

    res.render('quiz', data)
}