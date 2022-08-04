module.exports = (req,res) => {
    // Clear the stored web token
    res.cookie('jwt', '')
    res.redirect('/auth/login')
}