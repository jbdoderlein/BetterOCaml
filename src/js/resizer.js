if (typeof Resizer === 'undefined') {

	var Resizer = function(resizerNode, type, options) {
		resizerNode.classList.add('resizer');
		resizerNode.setAttribute('data-resizer-type', type);
		this.hidebar = (typeof options === 'undefined' ? null : options.hidebar);
		this.callbackMove = (typeof options === 'undefined' ? null : options.callbackMove);
		this.callbackStop = (typeof options === 'undefined' ? null : options.callbackStop);
		this.processing = false;
		this.container = {
			node: resizerNode.parentNode,
			playingSize: null,
			playingRatio: null
		};
		this.beforeBox = {
			node: resizerNode.previousElementSibling,
			ratio: null,
			size: null
		};
		this.resizer = {
			node: resizerNode,
			type: type
		};
		this.afterBox = {
			node: resizerNode.nextElementSibling,
			ratio: null,
			size: null
		};
		this.mousePosition = null;
		this.beforeBox.node.style.flexGrow = 1;
		this.afterBox.node.style.flexGrow = 1;
		this.beforeBox.node.style.flexShrink = 1;
		this.afterBox.node.style.flexShrink = 1;
		this.beforeBox.node.style.flexBasis = 0;
		this.afterBox.node.style.flexBasis = 0;
		// ajout des events
		this.resizer.node.addEventListener('mousedown', this.startProcess.bind(this), false);
	};

	Resizer.prototype = {
		startProcess: function(event) {
			// cas processus déjà actif
			if (this.processing) {
				return false;
			}
			// MAJ flag
			this.processing = true;
			// cacher la barre
			if (this.hidebar) {
				this.resizer.node.style.display = 'none';
			}
			// réinitialiser les variables
			this.beforeBox.ratio = parseFloat(this.beforeBox.node.style.flexGrow);
			this.afterBox.ratio = parseFloat(this.afterBox.node.style.flexGrow);
			this.mousePosition = (this.resizer.type === 'H' ? event.clientX : event.clientY);
			this.beforeBox.size = (this.resizer.type === 'H' ? this.beforeBox.node.offsetWidth : this.beforeBox.node.offsetHeight);
			this.afterBox.size = (this.resizer.type === 'H' ? this.afterBox.node.offsetWidth : this.afterBox.node.offsetHeight);
			this.container.playingSize = this.beforeBox.size + this.afterBox.size;
			this.container.playingRatio = this.beforeBox.ratio + this.afterBox.ratio;
			// lancer le processus
			this.stopProcessFunctionBinded = this.stopProcess.bind(this);
			document.addEventListener('mouseup', this.stopProcessFunctionBinded, false);
			this.processFunctionBinded = this.process.bind(this);
			document.addEventListener('mousemove', this.processFunctionBinded, false);
		},
		process: function(event) {
			if (!this.processing) {
				return false;
			}
			// calcul du mouvement de la souris
			var mousePositionNew = (this.resizer.type === 'H' ? event.clientX : event.clientY);
			var delta = mousePositionNew - this.mousePosition;
			// calcul des nouveaux ratios
			var ratio1, ratio2;
			ratio1 = (this.beforeBox.size + delta) * this.container.playingRatio / this.container.playingSize;
			if (ratio1 <= 0) {
				ratio1 = 0;
				ratio2 = this.container.playingRatio;
			} else if (ratio1 >= this.container.playingRatio) {
				ratio1 = this.container.playingRatio;
				ratio2 = 0;
			} else {
				ratio2 = (this.afterBox.size - delta) * this.container.playingRatio / this.container.playingSize;
			}
			// mise à jour du css
			this.beforeBox.node.style.flexGrow = ratio1;
			this.afterBox.node.style.flexGrow = ratio2;
			this.beforeBox.node.style.flexShrink = ratio2;
			this.afterBox.node.style.flexShrink = ratio1;
			// lancer la fonction de callback
			if (typeof this.callbackMove === 'function') {
				this.callbackMove();
			}
		},
		stopProcess: function(event) {
			// stopper le processus
     	document.removeEventListener('mousemove', this.processFunctionBinded, false);
			this.processFunctionBinded = null;
			document.removeEventListener('mouseup', this.stopProcessFunctionBinded, false);
			this.stopProcessFunctionBinded = null;
			// afficher la barre
			if (this.hidebar) {
				this.resizer.node.style.display = '';
			}
			// lancer la fonction de callback
			if (typeof this.callbackStop === 'function') {
				this.callbackStop();
			}
			// réinitialiser le flag
			this.processing = false;
		},
	};
} else {
	console.error('"Resizer" class already exists !');
}