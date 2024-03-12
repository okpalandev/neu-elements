function getCurrentRotation(element) {
    const transform = window.getComputedStyle(element).getPropertyValue('transform');
    const matrix = transform.match(/^matrix\((.+)\)$/);
    if (matrix) {
        const values = matrix[1].split(', ');
        if (values.length === 6) {
            const a = values[0];
            const b = values[1];
            const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            return angle >= 0 ? angle : angle + 360;
        }
    }
    return 0;
}   

function snapToNearestMark(pointer, marks) {
    const currentRotation = getCurrentRotation(pointer);
    let minDifference = Infinity;
    let nearestMarkRotation = null;

    marks.forEach(mark => {
        const markRotation = getCurrentRotation(mark);
        const difference = Math.abs(currentRotation - markRotation);
        if (difference < minDifference ) {
            minDifference = difference;
            nearestMarkRotation = markRotation;
        }
    });

    if (nearestMarkRotation !== null) {
        setPointerRotation(pointer, nearestMarkRotation);
    }

    
}

function setPointerRotation(pointer, rotation) {
    // Clamp rotation between 0 and 180 degrees
    rotation = Math.max(0, Math.min(rotation, 180));

    pointer.style.transition = 'transform 0.3s ease-out';
    pointer.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
}

document.addEventListener('DOMContentLoaded', () => {
    const dial = document.querySelector('.dial');
    const pointer = document.querySelector('.dial--pointer');
    let marks = Array.from(document.querySelectorAll('.dial--mark')); 
    
    
    dial.addEventListener('wheel', (event) => {
        event.preventDefault();
        const delta = Math.sign(event.deltaY);
        const currentRotation = getCurrentRotation(pointer);
        const newRotation = currentRotation + delta * 5; 
        setPointerRotation(pointer, newRotation);
        snapToNearestMark(pointer, marks); 
    });

    dial?.addEventListener('pointerdown', function (event: PointerEvent) {
        event.preventDefault();
        const rect = dial.getBoundingClientRect();
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };


        const startAngle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);
        let previousAngle = startAngle;

        function handlePointerMove(event: PointerEvent) {
            event.preventDefault();
            const currentAngle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);
            const delta = currentAngle - previousAngle;
            const currentRotation = getCurrentRotation(pointer);
            const newRotation = currentRotation + delta;
            setPointerRotation(pointer, newRotation);
            snapToNearestMark(pointer, marks); 
            previousAngle = currentAngle;
        }

        function handlePointerUp(event: PointerEvent) {
            event.preventDefault();
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        }

        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
        
    });
    
document.addEventListener('keydown', (event) => {
    const pointer = document.querySelector('.dial--pointer');
    const currentRotation = getCurrentRotation(pointer);
    switch (event.key) {
        // case 'ArrowUp':
        //     setPointerRotation(pointer, currentRotation - 5);
        //     snapToNearestMark(pointer, marks);
        //     break;
        // case 'ArrowDown':
        //     setPointerRotation(pointer, currentRotation + 5);
        //     snapToNearestMark(pointer, marks);
        //     break;
        case 'ArrowLeft':
            setPointerRotation(pointer, currentRotation - 10);
            snapToNearestMark(pointer, marks);
            break;
        case 'ArrowRight':
            setPointerRotation(pointer, currentRotation + 10);
            snapToNearestMark(pointer, marks);
            break;
    }
});

});
