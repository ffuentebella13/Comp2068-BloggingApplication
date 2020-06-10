const viewPath = ('blogs');
const Blog = require ('../models/blog');
exports.index = (req, res) => {
    res.send("Gotta cath them all");
}
exports.show = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render(`${viewPath}/show`, {
        pageTitle: blog.title,
        blog: blog
    });
};
exports.update = (req, res) => {
    res.send("wowza");
}
exports.new = (req, res) => {
    res.render(`${viewPath}/new`,{
    pageTitle: 'New Blog'
    });
};

exports.create = async (req, res) => {
    console.log(`Blog body: ${JSON.stringify(req.body, null, 2)}`);//look for object

    try{
        const blog = await Blog.create(req.body);
        res.redirect(`/blogs/${blog.id}`);
    } catch (err){
        //console.log(err);
        res.send(err)
    }

};

exports.edit = (req, res) => {
    res.send("Hey There");
}

exports.update = (req, res) => {
    res.send("wowza");
}

exports.delete = (req, res) => {
    res.send("goodbye");
}