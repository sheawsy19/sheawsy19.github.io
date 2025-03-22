let affection = 0;
let maxReached = false;
function typeWriter(text, i, fnCallback) {
    if (i < (text.length)) {
        document.querySelector("#welcomeMessage").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}
function openModal() {
  const modalText = document.getElementById("modalText");

    if(maxReached) {
        modalText.textContent = "咪姆好高兴！";
        modalText.classList.add("max-affection");
    } else {
        modalText.textContent = "摸摸咪姆增加亲密度！";
        modalText.classList.remove("max-affection");
    }

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const handleClick = function(event) {
        if(affection < 100) {
            affection += 5;
            document.getElementById("affection-value").textContent = affection;
            if(affection >= 100 && !maxReached) {
            maxReached = true;
            showMaxAffectionImage();
            updateModalText();
            clearInterval(animationInterval);
        }
    function updateModalText() {
    const modalText = document.getElementById("modalText");
    modalText.textContent = "咪姆好高兴！";
    modalText.classList.add("max-affection");
}
            const heart = document.createElement('img');
            heart.className = 'float-heart';
            heart.src = 'image/heart.png';
            heart.style.position = 'fixed';
            heart.style.zIndex = '9999';
            heart.style.left = `${event.clientX - 15}px`;
            heart.style.top = `${event.clientY - 15}px`;

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    };
    function showMaxAffectionImage() {
    const modalImg = document.getElementById("modalImage");
    new Image().src = 'image/max-affection.png';
    modalImg.src = 'image/max-affection.png';
}
    modalImg.removeEventListener('click', handleClick);
    modalImg.addEventListener('click', handleClick);

    let currentFrame = 1;
    const totalFrames = 5;
    let animationInterval;

    modal.style.display = "block";

    function updateFrame() {
        modalImg.src = `image/animation/frame${currentFrame}.png`;
        currentFrame = currentFrame % totalFrames + 1;
    }

    // 启动动画
    animationInterval = setInterval(updateFrame, 500);

    // 关闭时清除动画
    document.getElementsByClassName("close")[0].onclick = function() {
        clearInterval(animationInterval);
        modal.style.display = "none";
    }

    modal.onclick = function(event) {
        if (event.target == modal) {
            clearInterval(animationInterval);
            modal.style.display = "none";
        }
    }

    for(let i=1; i<=totalFrames; i++){
        new Image().src = `image/animation/frame${i}.png`;
    }
}

window.onload = function() {

    // 欢迎语打字效果
    document.getElementById("welcomeMessage").style.display = "block";
    typeWriter("你好！<br>欢迎来到MMMM之家~<br>请问您如何称呼？", 0, function(){
        document.getElementById("nameForm").style.display = "flex";
        document.getElementById("welcomeMessage").style.display = "none";
        document.getElementById("nameInput").focus();
    });

    // 输入框
    document.getElementById("nameInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitName();
        }
    });

  document.addEventListener('click', function(event) {
      const target = event.target;

      if (target.closest('.image-button')) {
          openModal();
      }
  });
}


function submitName() {
    var name = document.getElementById("nameInput").value.trim();
    if (name) {
        document.getElementById("nameForm").style.display = "none";

        document.getElementById("postSubmitContent").style.display = "block";

        document.getElementById("welcomeMessage").style.display = "block";
        document.getElementById("welcomeMessage").innerHTML = "";

        // 显示游戏开始引导
        typeWriter(`您好！${name}，咪姆等你很久了！`, 0, function() {
            document.getElementById("game").style.display = "block";
        });
    }
    else {
        alert("请输入你的名字！");
    }
}
