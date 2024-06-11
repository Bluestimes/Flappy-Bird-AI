// a connection between 2 nodes
class ConnectionGene {
    constructor (fromNode, toNode, weight, innovationNumber) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.weight = weight;
        this.enabled = true;
        this.innovationNumber = innovationNumber; // each connection is given a innovation number to compare genomes
    }

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // changes the this.weight
    mutateWeight () {
        // 10% of the time completely change the this.weight
        if (random(1) < 0.1) { 
            this.weight = random(-1, 1);
            return;
        }
        
        // otherwise slightly change it
        this.weight += randomGaussian() / 50;

        // keep this.weight between bounds
       this.weight = clamp(this.weight, -1, 1);
    }

    // ----------------------------------------------------------------------------------------------------------
    // returns a copy of this ConnectionGene
    clone (from, to) {
        let clone = new ConnectionGene(from, to, this.weight, this.innovationNumber);
        clone.enabled = this.enabled;

        return clone;
    }
}
