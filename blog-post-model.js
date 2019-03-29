const uuid = require('uuid')

let blogDB = [
    {
        id: uuid.v4(),
        title: "10 DIY Projects",
        content: "A compilation of 10 easy projects for you to make yourself",
        author: "Erin",
        publishDate: '21/03/2019'
    },
    {
        id: uuid.v4(),
        title: "Starting with Linux",
        content: "How to start using linux and some basic commands",
        author: "Joaquin",
        publishDate: '22/03/2019'
    },
    {
        id: uuid.v4(),
        title: "The art of dribbling",
        content: "Dribble the soccer ball as a professional",
        author: "Ismael",
        publishDate: '23/03/2019'
    }
]

const ListBPost = {
    get : function (){
        return blogDB
    },

    getauth: function (author){
        const authpost = [];

        blogDB.forEach(item => {
            if(author == item.author){
                authpost.push(item);
            }
        });
        return authpost
    },

    PostAdd: function (newbp) {
      newbp['id'] = uuid.v4()
      blogDB.push(newbp);
      return newbp
    },

    UpdPost: function (pathId, pUpdate) {
        let PostUpdated
        let bool = false;
        blogDB.forEach(item => {
        if(pathId == item.id){
            if(pUpdate.title) {
                item.title = pUpdate.title;
            }
            if(pUpdate.content) {
                item.content = pUpdate.content;
            }
            if(pUpdate.author) {
                item.author = pUpdate.author;
            }
            if(pUpdate.publishDate) {
                item.publishDate = pUpdate.publishDate;
            }
            PostUpdated = item;
            bool = true;
        }
    });
      return bool
    },

    DelPost: function(removalId, pId) {
      let retbool = false;
      let itIndex = null;
      let val = false;
      let i = -1;

      blogDB.forEach(item=> {
        i = i+1;
        if (pId == removalId){
            itIndex = i;
            val = true;
        }
    });

      if (val == true){
        blogDB.forEach(item => {
        if(pId == item.id){
            blogDB.splice(itIndex, 1);
            retbool = true;
        }
    });
      }
      return retbool
    }
}

module.exports = {ListBPost};