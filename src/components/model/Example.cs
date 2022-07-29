
h3
{
    margin-top: -56px;
    color: white;
    box-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3;
    background: radial-gradient(black, transparent);

}

.maindiv {
  
    width: 50%;
    height:610px;
    background-color: rgb(0, 255, 149);
    animation-name: example;
    animation-duration: 30s;
    border: 6px solid black;
    border-radius: 18px;
    margin-left: 350px;
    
  }
  
  @keyframes example {
    0%   {background-color: rgb(64, 153, 168);}
    10%  {background-color: purple;}
    25%  {background-color: blue;}
    45% {background-color: green;}
    60%  {background-color: orange;}
    80%  {background-color: white;}
    0% {background-color: black;}
  }
  



  #bd
{
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    border-radius: 15px;
    background: #031321;
    font-family: consolas;
    margin-left: 140px;
    height: 40px;
}
a
{
    position: relative;
    display: inline-block;
    padding: 15px 30px;
    color: #2196f3;
    text-transform: uppercase;
    letter-spacing: 4px;
    text-decoration: none;
    font-size: 24px;
    overflow: hidden;
    transition: 0.2s;
}
a:hover
{
    color: #255784;
    background: #2196f3;
    box-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3;
    transition-delay: 1s;
    width: 100px;
    border-radius: 10px;
     height: 17px;
}
a span
{
    position: absolute;
    display: block;
}
a span:nth-child(1)
{
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg,transparent,#2196f3);
}
a:hover span:nth-child(1)
{
    left: 100%;
    transition: 1s;
} 
a span:nth-child(2)
{
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg,transparent,#2196f3);
}
a:hover span:nth-child(2)
{
    right: 100%;
    transition: 1s;
    transition-delay: 0.5s;
}
a span:nth-child(3)
{
    top: -100℅;
    right: 0%;
    width: 2px%;
    height: 100%;
    background: linear-gradient(180deg,transparent,#2196f3);
}
a:hover span:nth-child(3)
{
    top: 100%;
    transition: 1s;
    transition-delay: 0.25s;
}
a span:nth-child(4)
{
    bottom: -100℅;
    left: 0%;
    width: 2px%;
    height: 100%;
    background: linear-gradient(360deg,transparent,#2196f3);
}
a:hover span:nth-child(4)
{
    bottom: 100%;
    transition: 1s;
    transition-delay: 0.75s;
}

  