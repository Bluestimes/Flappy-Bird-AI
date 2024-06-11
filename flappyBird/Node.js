class Node {
    constructor (number) {
        this.number = number;
        this.weightedSum = 0; // current sum i.e. before activation
        this.activatedWeightedSum = 0; // after activation function is applied
        this.outputConnections = []; // new ArrayList<ConnectionGene>();
        this.layer = 0;
        this.drawPos = createVector();
    }

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // the node sends its output to the inputs of the nodes its connected to
    engage () {
        if (this.layer != 0) { // no sigmoid for the inputs and bias
            this.activatedWeightedSum = Node.sigmoid(this.weightedSum);
        }

        for (let i = 0; i < this.outputConnections.length; i++) { // for each connection
            if (!this.outputConnections[i].enabled) continue;
            
            this.outputConnections[i].toNode.inputSum += this.outputConnections[i].weight * this.activatedWeightedSum; // add the weighted output to the sum of the inputs of whatever node this node is connected to
        }
    }
    
    static sigmoid (x) {
        return 1.0 / (1.0 + pow(Math.E, -4.9 * x));
    }

    static stepFunction (x) {
        return Math.max(x, 0);
    }
    
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------
    // returns whether this node connected to the parameter node
    // used when adding a new connection
    isConnectedTo (node) {
        if (node.layer == this.layer) { // nodes in the same this.layer cannot be connected
            return false;
        }

        if (node.layer < this.layer) {
            checkConnectionsFor(node, this);
        } else {
            checkConnectionsFor(this, node);
        }

        return false;
        
        function checkConnectionsFor(origin, target){
            for (let connection of origin.outputConnections){
                if(connection.toNode == target) return true;
            }
        }
    }

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // returns a copy of this node
    clone () {
        let clone = new Node(this.number);
        clone.layer = this.layer;
        return clone;
    }
}
