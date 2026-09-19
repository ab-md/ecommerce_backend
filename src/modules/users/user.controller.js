const getUsers = (req, res, next) => {
    try {
        res.status(200).json({
            message: "OK"
        })
        next();
    } catch (error) {
        next(error);
    }
}

export {
    getUsers,
}