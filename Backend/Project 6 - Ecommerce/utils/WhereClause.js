// base : Product.find()
// bigQ : search=coder&page=2&category=shortsSleev&rating[gte]=4&price[lte]=999&price[gte]=1999

class WhereClause{
    constructor(base, bigQ){
        this.base = base;
        this.bigQ = bigQ;
    }

    search(){
        const searchWord = this.bigQ.search ? {
            name: {
                $regex: this.bigQ.search,
                $options: 'i'
            }
        }: {}

        this.base = this.base.find({...searchWord})
        // it will look like
        // Product.find({name:{$regex: "text", $options: 'i'}})
        
        return this;
    }

    filter(){
        //make a separate copy of the Query
        const copyQ = {...this.bigQ}
        
        //delete unwanted keys from the object
        delete copyQ["search"],
        delete copyQ["page"],
        delete copyQ["limit"]

        // convert CopyQ into String 
        let stringCopyQ = JSON.stringify(copyQ)
        stringCopyQ = stringCopyQ.replace(/\b(gte|lte|gt|lt)\b/i, (str)=>{ //Replacing gte with $gte
            return `$${str}`
        })

        const objectFormat = JSON.parse(stringCopyQ)
        this.base = this.base.find(objectFormat)
        return this;
    }

    pager(resultPerPage){
        let currentPage = 1
        if(this.bigQ.page){
            currentPage = this.bigQ.page
        }
 
        const skipVal = resultPerPage * (currentPage - 1)
        
        this.base = this.base.limit(resultPerPage).skip(skipVal)
        // It will look like
        // Product.find().limit(5).skip(15)

        return this;
    }   
}

module.exports = WhereClause