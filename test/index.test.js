
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const EmailChecker = require('../index');
const testEmails = require('./emails.json');

chai.use(chaiHttp);

describe("Email Checker", () =>  {

    describe("Only Duplicates", () =>  {

        it("Should exclude the duplicate emails", () =>  {
            const emails = testEmails.basicDuplicate;
            expect(EmailChecker.checkEmails(emails.data)).to.deep.equal(emails.result);
        });
    });

    describe("Gmail-specific", () =>  {
        
        it("Should compare without periods for Gmail emails only", () =>  {
            const emails = testEmails.gmailPeriod;
            expect(EmailChecker.checkEmails(emails.data)).to.deep.equal(emails.result);
        });

        it("Should compare only the substring before the plus sign for Gmail emails only", () =>  {
            const emails = testEmails.gmailPlusSign;
            expect(EmailChecker.checkEmails(emails.data)).to.deep.equal(emails.result);
        });
    });

    describe("A bunch of combined cases", () => {

        it("Should compare using all the criteria from the other cases", () =>  {
            const emails = testEmails.all;
            expect(EmailChecker.checkEmails(emails.data)).to.deep.equal(emails.result);
        });
    });
});

describe("Web Server", () => {

    describe("Success Paths", () => {

        it("Should return a 200 status code with a number returned in the body", (done) => {
            chai.request(EmailChecker.app)
            .post('/checkemails')
            .send({ data: ['testmail@yopmail.com', 'testmail@mailinator.com', 'test@yopmail.com']})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equal(3);
                done();
            });
        });
    });

    describe("Failure Paths", () => {

        it("Should return a 404 status code for an undefined route", (done) => {
            chai.request(EmailChecker.app)
            .post('/undefinedroute')
            .send({ data: ['testmail@yopmail.com']})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                done();
            });
        });

        it("Should return a 404 status code for a bad http method", (done) => {
            chai.request(EmailChecker.app)
            .get('/checkemails')
            .send({ data: ['testmail@yopmail.com']})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                done();
            });
        });

        it("Should return a 400 status code for an empty data array", (done) => {
            chai.request(EmailChecker.app)
            .post('/checkemails')
            .send({ data: [] })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
        });

        it("Should return a 400 status code for an empty payload", (done) => {
            chai.request(EmailChecker.app)
            .post('/checkemails')
            .send()
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
        });

        it("Should return a 400 status code for a payload with an incorrect, but similar structure", (done) => {
            chai.request(EmailChecker.app)
            .post('/checkemails')
            .send({ notdata: ['testmail@yopmail.com'] })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            });
        });
    });
});