
// export class NeuDial extends HTMLElement {
//     public static get observedAttributes() {
//         return ['n-marks','n-rings'];
//     }

//     public value: number = 0;
//     public nMarks: number = 4;
//     public nRings: number = 2;
//     public marks: NodeListOf<Element>;
//     public pointer: Element;

//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//         this.marks = this.shadowRoot.querySelectorAll('.dial--mark') as NodeListOf<Element>;
//         this.pointer = this.shadowRoot.querySelector('.dial--pointer') as Element;
//             this.shadowRoot.innerHTML = `
//                 <div class="dial">
//                 <div class="dial--pointer"></div>
//                 <div class="dial--outer">
//                 ${Array.from({ length: this.nRings }).map(() => '<div class="dial--ring"></div>').join('')}
//                 </div>
//                 <div class="dial--marks">
//                 ${Array.from({ length: this.nMarks }).map(() => '<div class="dial--mark"></div>').join('')}
//                 </div>
//                 </div>
//             `;
        
//     }

//     connectedCallback() {
//         this.addEventListener('wheel', this.handleWheel);
//         this.addEventListener('pointerdown', this.handlePointerDown);
//         document.addEventListener('pointermove', this.handlePointerMove);
//         document.addEventListener('pointerup', this.handlePointerUp);
//         document.addEventListener('keydown', this.handleKeyDown);
//     }

//     disconnectedCallback() {
//         this.removeEventListener('wheel', this.handleWheel);
//         this.removeEventListener('pointerdown', this.handlePointerDown);
//         document.removeEventListener('pointermove', this.handlePointerMove);
//         document.removeEventListener('pointerup', this.handlePointerUp);
//         document.removeEventListener('keydown', this.handleKeyDown);
//     }

//     getCurrentRotation(element) {
//         const transform = window.getComputedStyle(element).getPropertyValue('transform');
//         const matrix = transform.match(/^matrix\((.+)\)$/);
//         if (matrix) {
//             const values = matrix[1].split(', ');
//             if (values.length === 6) {
//                 const a = values[0];
//                 const b = values[1];
//                 const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
//                 return angle >= 0 ? angle : angle + 360;
//             }
//         }
//         return 0;
//     }

//     snapToNearestMark(pointer, marks) {
//         const currentRotation = this.getCurrentRotation(pointer);
//         let minDifference = Infinity;
//         let nearestMarkRotation = null;

//         marks.forEach(mark => {
//             const markRotation = this.getCurrentRotation(mark);
//             const difference = Math.abs(currentRotation - markRotation);
//             const MIN_SNAP_DIFFERENCE = 5;
//             if (difference < minDifference && difference <= MIN_SNAP_DIFFERENCE) {
//                 minDifference = difference;
//                 nearestMarkRotation = markRotation;
//             }
//         });

//         if (nearestMarkRotation !== null) {
//             this.setPointerRotation(pointer, nearestMarkRotation);
//         }
//     }

//     setPointerRotation(pointer, rotation) {
//         // Clamp rotation between 0 and 180 degrees
//         rotation = Math.max(0, Math.min(rotation, 180));

//         pointer.style.transition = 'transform 0.3s ease-out';
//         pointer.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
//     }

//     handleWheel(event) {
//         event.preventDefault();
//         const delta = Math.sign(event.deltaY);
//         const currentRotation = this.getCurrentRotation(this.pointer);
//         const newRotation = currentRotation + delta * 5;
//         this.setPointerRotation(this.pointer, newRotation);
//         this.snapToNearestMark(this.pointer, this.marks);
//     }

//     handlePointerDown(event) {
//         event.preventDefault();
//         const rect = this.getBoundingClientRect();
//         const center = {
//             x: rect.left + rect.width / 2,
//             y: rect.top + rect.height / 2
//         };

//         const startAngle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);
//         let previousAngle = startAngle;

//         this.handlePointerMove = (event) => {
//             event.preventDefault();
//             const currentAngle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);
//             const delta = currentAngle - previousAngle;
//             const currentRotation = this.getCurrentRotation(this.pointer);
//             const newRotation = currentRotation + delta;
//             this.setPointerRotation(this.pointer, newRotation);
//             this.snapToNearestMark(this.pointer, this.marks);
//             previousAngle = currentAngle;
//         };

//         this.handlePointerUp = () => {
//             event.preventDefault();
//             document.removeEventListener('pointermove', this.handlePointerMove);
//             document.removeEventListener('pointerup', this.handlePointerUp);
//         };

//         document.addEventListener('pointermove', this.handlePointerMove);
//         document.addEventListener('pointerup', this.handlePointerUp);
//     }

//     handleKeyDown(event) {
//         const pointer = this.shadowRoot.querySelector('.dial--pointer');
//         const currentRotation = this.getCurrentRotation(pointer);
//         switch (event.key) {
//             case 'ArrowLeft':
//                 this.setPointerRotation(pointer, currentRotation - 10);
//                 this.snapToNearestMark(pointer, this.marks);
//                 break;
//             case 'ArrowRight':
//                 this.setPointerRotation(pointer, currentRotation + 10);
//                 this.snapToNearestMark(pointer, this.marks);
//                 break;
//         }
//     }
// }

// customElements.define('neu-dial', NeuDial);
