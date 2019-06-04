const chai=require("chai");
const chaiHttp=require("chai-http");
const server=require("../server.js");
const should=chai.should();

chai.use(chaiHttp);

describe("Items CRUD Tests",()=>{
    it("should get all items",()=>{  

        chai.request(server).get("/items").end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a("array");
        });
        
    });

    it("should get an item with param",()=>{
        chai.request(server).get("/items/2").end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a("object");
        });
    });

    it("should can't find any product from list",()=>{
        chai.request(server).get("/items/9999").end((err,res)=>{
            res.should.have.status(404);
        });
    });

    it("should add a new item",()=>{
        const item={
            title:"Have a good trip"
        };
        chai.request(server).post("/items/").send(item).end((err,res)=>{
            res.should.have.status(201);
            chai.expect(res.body.title).to.equal("Have a good trip");
        });
    });

    it("should update first item",()=>{
        const item={
            title:"Cycling tour",
            order:5,
            completed:true
        };
        chai.request(server).put("/items/1").send(item).end((err,res)=>{
            res.should.have.status(204);
        });
    });

    it("should can't find and updated an item",()=>{
        const item={
            title:"Cycling tour",
            order:5,
            completed:true
        };
        chai.request(server).put("/items/9999").send(item).end((err,res)=>{
            res.should.have.status(404);
        });        
    });

    it("should delete an item",()=>{
        chai.request(server).delete("/items/1").end((err,res)=>{
            res.should.have.status(204);
        });
    });
    
});