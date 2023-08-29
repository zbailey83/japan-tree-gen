const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let leafCounter = 1;

function drawBranch(x, y, angle, branchLength, lineWidth) {
  if (branchLength < 5) {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    if (leafCounter % 220 === 0) {
      leaf.classList.add('fruit');
    }
    leaf.style.left = `${x - 5}px`; 
    leaf.style.top = `${y - 5}px`;
    document.body.appendChild(leaf);

    leafCounter++;
    return;
  }
  if (branchLength < 5) return; 

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = '#412e1f'; 

  ctx.beginPath();
  ctx.moveTo(x, y);
  const endX = x + Math.cos(angle) * branchLength;
  const endY = y + Math.sin(angle) * branchLength;
  ctx.lineTo(endX, endY);
  ctx.stroke();
	
	let branchOutAngle = Math.floor(Math.random() * 25) + 15;
	
  const numBranches = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < numBranches; i++) {
    const direction = Math.random() < 0.5 ? 1 : -1;
    const newAngle = angle + direction * (i % (180 / branchOutAngle) === 0 ? Math.PI / (180 / branchOutAngle) : -Math.PI / (180 / branchOutAngle));
    const newLength = branchLength * (0.6 + Math.random() * 0.2);
    drawBranch(endX, endY, newAngle, newLength, lineWidth * 0.8);
  }
}

function removeLeavesAndFruits() {
  const leavesAndFruits = document.querySelectorAll('.leaf');
  leavesAndFruits.forEach((leaf) => {
    leaf.remove();
  });
}


function drawCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  leafCounter = 1;
	
	removeLeavesAndFruits();

  const initialX = canvas.width / 2;
  const initialY = window.innerHeight / 2 + 120;
  const initialAngle = -Math.PI / 2;
  const initialBranchLength = Math.min(120, Math.min(window.innerWidth / 4, window.innerHeight / 5.5));
  const initialLineWidth = 7;

  drawBranch(initialX, initialY, initialAngle, initialBranchLength, initialLineWidth);
}
drawCanvas();
window.addEventListener('resize', () => {
  drawCanvas();
});

const generateTreeButton = document.getElementById('generateTreeButton');
generateTreeButton.addEventListener('click', () => {
  drawCanvas();
});
