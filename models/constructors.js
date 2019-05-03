class Traits {
    constructor(trait1, trait2, trait3, trait4, trait5) {
        this.trait1 = trait1
        this.trait2 = trait2
        this.trait3 = trait3
        this.trait4 = trait4
        this.trait5 = trait5
    }
}

class Avatar {
    constructor(name, t1, t2, t3, t4, t5) {
        this.name = name
        this.t1 = t1
        this.t2 = t2
        this.t3 = t3
        this.t4 = t4
        this.t5 = t5
    }
}

class Question {
    constructor(q, responses, trait1, trait2) {
        this.q = q
        this.responses = responses
        this.trait1 = trait1
        this.trait2 = trait2
    }
}

class Response {
    constructor(r, oc) {
        this.r = r
        this.oc = oc
    }
}

class Outcome {
    constructor(trait, amount, upDown) {
        this.trait = trait
        this.amount = amount
        this.upDown = upDown
    }
}

module.exports = { Traits, Avatar, Question, Response, Outcome }