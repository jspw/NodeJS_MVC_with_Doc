exports.getPosts = (req, res, next) => {
    res.status(200).json(
        {
            posts: [
                {
                    title: "Post1",
                    conrent: "This is a shitty post",
                }
            ]
        }
    );
};