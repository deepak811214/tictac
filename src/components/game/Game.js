import React, { useState, useEffect } from 'react'
import '../Game.css'
import { NavLink } from 'react-router-dom';

function Game(props) {
    let syncResult = false;
    const state = props.location.state;
    const [option, setOption] = useState(null)
    const [option2, setOption2] = useState(null)
    const [value_1, setValueIn1] = useState("")
    const [value_2, setValueIn2] = useState("")
    const [value_3, setValueIn3] = useState("")
    const [value_4, setValueIn4] = useState("")
    const [value_5, setValueIn5] = useState("")
    const [value_6, setValueIn6] = useState("")
    const [value_7, setValueIn7] = useState("")
    const [value_8, setValueIn8] = useState("")
    const [value_9, setValueIn9] = useState("")
    const [strategy, setStrategy] = useState(0)
    const [step, setStep] = useState(1)
    const [winner, setWinner] = useState(true);
    const [result, setResult] = useState("");
    const [presentation, setPresentation]= useState('');
    const [scoreX,setScoreX]=useState(0);
    const [scoreO,setScoreO]=useState(0)

    const onChangeValue = (event) => {
        if(value_1 || value_2 || value_3 || value_4 || value_5 || value_6 || value_7 || value_8 || value_9){
            return;
        }
        setOption(event.target.value);
        if (event.target.value === "x") {
            setOption2("o")
        } else {
            setOption2("x")
        }
    }

    const decideWinner = ()=>{
        if(value_1 && value_1===value_2 && value_2===value_3){
            calcScore(value_1)
            setPresentation("line-row-1")
        } else if(value_4 && value_4===value_5 && value_5===value_6){
            calcScore(value_4)
            setPresentation("line-row-2")           
        } else if(value_7 && value_7===value_8 && value_8===value_9){
            calcScore(value_7)
            setPresentation("line-row-3")  
        } else if(value_1 && value_1===value_4 && value_4===value_7){
            calcScore(value_1)
            setPresentation("line-col-1")  
        } else if(value_2 && value_2===value_5 && value_5===value_8){
            calcScore(value_2)
            setPresentation("line-col-2")  
        } else if(value_3 && value_3===value_6 && value_6===value_9){
            calcScore(value_3)
            setPresentation("line-col-3")  
        } else if(value_1 && value_1===value_5 && value_5===value_9){
            calcScore(value_1)
            setPresentation("line-cross-1")  
        } else if(value_3 && value_3===value_5 && value_5===value_7){
            calcScore(value_3)
            setPresentation("line-cross-2")  
        }
    }

    const calcScore=(option)=> {
        if(option === "x"){
            setScoreX((scoreX)=>scoreX+1)
            setResult(`${state.name.user || "Player 1"} wins!`);
        } else {
            setScoreO((scoreO)=>scoreO+1)
            setResult(`${state.name.opponent || "Player 2"} wins!`);
        }
        syncResult = true;
    }

    const resetSteps = () => {
        setValueIn1("");
        setValueIn2("");
        setValueIn3("");
        setValueIn4("");
        setValueIn5("");
        setValueIn6("");
        setValueIn7("");
        setValueIn8("");
        setValueIn9("");
        setPresentation('');
        setStep(1);
        setResult('');
        setWinner(true);
    }

    useEffect(() => {
        if (step >= 3 && winner == false) {
            decideWinner()
        }
        if(step > 9 && syncResult === false){
            setResult("it's tie"); 
        }
    }, [winner,step])

    const handleClick = (event) => {
        let target = event.target.id;
        displayOption(target,option);
    
        if (option && target) {
            setStep(prevStep => prevStep + 1)
        } else {
            return
        }

        if(state.mode ==="1"){
           setTimeout(()=>{singleMode(target)}, 500)
        } else {
            if(step%2 === 0){
                displayOption(target,option2);
            }
            setWinner(false)
        }
    }

    const singleMode = (target)=>{
        if (step === 1) {
            if (target === "1") {
                setValueIn5(option2);
                setStrategy(1);
            } else if (target === "3") {
                setValueIn5(option2);
                setStrategy(3);
            } else if (target === "7") {
                setValueIn5(option2);
                setStrategy(7);
            } else if (target === "9") {
                setValueIn5(option2);
                setStrategy(9);
            } else if (target === "2") {
                setValueIn5(option2);
                setStrategy(2);
            } else if (target === "4") {
                setValueIn5(option2);
                setStrategy(4);
            } else if (target === "6") {
                setValueIn5(option2);
                setStrategy(6);
            } else if (target === "8") {
                setValueIn5(option2);
                setStrategy(8);
            } else if (target === "5") {
                setValueIn1(option2);
                setStrategy(5);
            }
        }

        if (step === 2) {
            if (strategy === 5) { // user mark the center
                if (target === "7") {
                    setValueIn3(option2);
                    setStrategy(1);
                } else if (target === "9") {
                    setValueIn7(option2);
                    setStrategy(7);
                } else if (target === "3") {
                    setValueIn7(option2);
                    setStrategy(2);
                } else if (target === "2") {
                    setValueIn8(option2);
                    setStrategy(3);
                } else if (target === "4") {
                    setValueIn6(option2);
                    setStrategy(4);
                } else if (target === "6") {
                    setValueIn4(option2);
                    setStrategy(5);
                } else if (target === "8") {
                    setValueIn2(option2);
                    setStrategy(6);
                }
            } else if (strategy === 1) { // user mark the corner
                if (target === "3") {
                    setValueIn2(option2);
                    setStrategy(8);
                } else if (target === "7") {
                    setValueIn4(option2);
                    setStrategy(9);
                } else if (target === "9") {
                    setValueIn4(option2);
                    setStrategy(10);
                } else if (target === "2") {
                    setValueIn3(option2);
                    setStrategy(11);
                } else if (target === "4") {
                    setValueIn7(option2);
                    setStrategy(12);
                } else if (target === "6") {
                    setValueIn9(option2);
                    setStrategy(13);
                } else if (target === "8") {
                    setValueIn9(option2);
                    setStrategy(14);
                }
            } else if (strategy === 3) {
                if (target === "1") {
                    setValueIn2(option2);
                    setStrategy(8);
                } else if (target === "7") {
                    setValueIn4(option2);
                    setStrategy(9);
                } else if (target === "9") {
                    setValueIn6(option2);
                    setStrategy(15);
                } else if (target === "2") {
                    setValueIn1(option2);
                    setStrategy(16);
                } else if (target === "4") {
                    setValueIn7(option2);
                    setStrategy(17);
                } else if (target === "6") {
                    setValueIn9(option2);
                    setStrategy(18);
                } else if (target === "8") {
                    setValueIn9(option2);
                    setStrategy(19);
                }
            } else if (strategy === 7) {
                if (target === "1") {
                    setValueIn4(option2);
                    setStrategy(20);
                } else if (target === "3") {
                    setValueIn4(option2);
                    setStrategy(21);
                } else if (target === "9") {
                    setValueIn8(option2);
                    setStrategy(22);
                } else if (target === "2") {
                    setValueIn1(option2);
                    setStrategy(23);
                } else if (target === "4") {
                    setValueIn1(option2);
                    setStrategy(24);
                } else if (target === "6") {
                    setValueIn9(option2);
                    setStrategy(25);
                } else if (target === "8") {
                    setValueIn9(option2);
                    setStrategy(26);
                }
            } else if (strategy === 9) {
                if (target === "1") {
                    setValueIn4(option2);
                    setStrategy(27);
                } else if (target === "3") {
                    setValueIn6(option2);
                    setStrategy(28);
                } else if (target === "7") {
                    setValueIn8(option2);
                    setStrategy(22);
                } else if (target === "2") {
                    setValueIn4(option2);
                    setStrategy(29);
                } else if (target === "4") {
                    setValueIn7(option2);
                    setStrategy(30);
                } else if (target === "6") { //start here
                    setValueIn3(option2);
                    setStrategy(31);
                } else if (target === "8") {
                    setValueIn7(option2);
                    setStrategy(32);
                }
            } else if (strategy === 2) {
                if (target === "1") {
                    setValueIn3(option2);
                    setStrategy(33);
                } else if (target === "3") {
                    setValueIn1(option2);
                    setStrategy(34);
                } else if (target === "7") {
                    setValueIn1(option2);
                    setStrategy(35);
                } else if (target === "9") {
                    setValueIn4(option2);
                    setStrategy(36);
                } else if (target === "4") {
                    setValueIn7(option2);
                    setStrategy(37);
                } else if (target === "6") {
                    setValueIn3(option2);
                    setStrategy(38);
                } else if (target === "8") {
                    setValueIn7(option2);
                    setStrategy(39);
                }
            } else if (strategy === 4) {
                if (target === "1") {
                    setValueIn7(option2);
                    setStrategy(40);
                } else if (target === "3") {
                    setValueIn1(option2);
                    setStrategy(41);
                } else if (target === "7") {
                    setValueIn1(option2);
                    setStrategy(42);
                } else if (target === "9") {
                    setValueIn8(option2);
                    setStrategy(43);
                } else if (target === "2") {
                    setValueIn7(option2);
                    setStrategy(37);
                } else if (target === "6") {
                    setValueIn3(option2);
                    setStrategy(44);
                } else if (target === "8") {
                    setValueIn7(option2);
                    setStrategy(45);
                }
            } else if (strategy === 6) {
                if (target === "1") {
                    setValueIn2(option2);
                    setStrategy(46);
                } else if (target === "3") {
                    setValueIn9(option2)
                    setStrategy(47);
                } else if (target === "7") {
                    setValueIn2(option2);
                    setStrategy(48);
                } else if (target === "9") {
                    setValueIn3(option2);
                    setStrategy(49);
                } else if (target === "2") {
                    setValueIn3(option2);
                    setStrategy(50);
                } else if (target === "4") {
                    setValueIn3(option2);
                    setStrategy(44);
                } else if (target === "8") {
                    setValueIn7(option2);
                    setStrategy(51);
                }
            } else if (strategy === 8) {
                if (target === "1") {
                    setValueIn7(option2);
                    setStrategy(52);
                } else if (target === "3") {
                    setValueIn9(option2)
                    setStrategy(53);
                } else if (target === "7") {
                    setValueIn9(option2);
                    setStrategy(54);
                } else if (target === "9") {
                    setValueIn7(option2);
                    setStrategy(55);
                } else if (target === "2") {
                    setValueIn3(option2);
                    setStrategy(56);
                } else if (target === "4") {
                    setValueIn1(option2);
                    setStrategy(57);
                } else if (target === "6") {
                    setValueIn7(option2);
                    setStrategy(58);
                }
            }
        }

        if (step === 3) {
            if (strategy === 1) {
                if (target === "4" || target === "6" || target === "7" || target === "9") {
                    setValueIn2(option2)
                    setWinner(false)
                } else if (target === "2") {
                    setValueIn8(option2);
                    setStrategy(1);
                }
            } else if (strategy === 2) {
                if (target === "4") {
                    setValueIn6(option2)
                    setStrategy(2);
                } else if (target === "2" || target === "6" || target === "8" || target === "9") {
                    setValueIn4(option2)
                    setWinner(false)
                }
            } else if (strategy === 3) {
                if (target === "3") {
                    setValueIn7(option2)
                    setStrategy(3);
                } else if (target === "4") {
                    setValueIn6(option2)
                    setStrategy(4);
                } else if (target === "6") {
                    setValueIn4(option2)
                    setStrategy(4)
                } else if (target === "7" || target === "9") {
                    setValueIn3(option2)
                    setStrategy(1);
                }
            } else if (strategy === 4) {
                if (target === "2") {
                    setValueIn8(option2)
                    setStrategy(4);
                } else if (target === "3") {
                    setValueIn7(option2)
                    setStrategy(4);
                } else if (target === "7") {
                    setValueIn3(option2)
                    setStrategy(5)
                } else if (target === "8" || target === "9") {
                    setValueIn2(option2)
                    setStrategy(4);
                }
            } else if (strategy === 5) {
                if (target === "7") {
                    setValueIn3(option2)
                    setStrategy(6);
                } else if (target === "2" || target === "3" || target === "8" || target === "9") {
                    setValueIn7(option2)
                    setWinner(false);
                }
            } else if (strategy === 6) {
                if (target === "3") {
                    setValueIn7(option2)
                    setStrategy(7);
                } else if (target === "4" || target === "6" || target === "7" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false);
                }
            } else if (strategy === 7) {
                if (target === "2" || target === "3" || target === "6" || target === "8") {
                    setValueIn4(option2)
                    setWinner(false)
                } else if (target === "4") {
                    setValueIn6(option2);
                    setStrategy(8);
                }
            } else if (strategy === 8) {
                if (target === "4" || target === "6" || target === "7" || target === "9") {
                    setValueIn8(option2)
                    setWinner(false)
                } else if (target === "8") {
                    setValueIn6(option2);
                    setStrategy(9);
                }
            } else if (strategy === 9) {
                if (target === "2" || target === "3" || target === "8" || target === "9" || target === "1") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "6") {
                    setValueIn2(option2);
                    setStrategy(10);
                }
            } else if (strategy === 10) {
                if (target === "2" || target === "3" || target === "7" || target === "8" || target === "1") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "6") {
                    setValueIn3(option2);
                    setStrategy(11);
                }
            } else if (strategy === 11) {
                if (target === "4" || target === "6" || target === "8" || target === "9") {
                    setValueIn7(option2)
                    setWinner(false)
                } else if (target === "7") {
                    setValueIn4(option2);
                    setStrategy(12);
                }
            } else if (strategy === 12) {
                if (target === "2" || target === "6" || target === "8" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn2(option2);
                    setStrategy(13);
                }
            } else if (strategy === 13) {
                if (target === "2") {
                    setValueIn3(option2)
                    setStrategy(14);
                } else if (target === "4") {
                    setValueIn7(option2);
                    setStrategy(15);
                } else if (target === "3") {
                    setValueIn2(option2);
                    setStrategy(16);
                } else if (target === "7") {
                    setValueIn4(option2);
                    setStrategy(17);
                } else if (target === "8") {
                    setValueIn4(option2);
                    setStrategy(17);
                }
            } else if (strategy === 15) {
                if (target === "2" || target === "7" || target === "8" || target === "1") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "4") {
                    setValueIn2(option2);
                    setStrategy(18);
                }
            } else if (strategy === 16) {
                if (target === "4" || target === "6" || target === "8" || target === "7") {
                    setValueIn7(option2)
                    setWinner(false)
                } else if (target === "9") {
                    setValueIn6(option2);
                    setStrategy(19);
                }
            } else if (strategy === 17) {
                if (target === "1") {
                    setValueIn2(option2)
                    setStrategy(20);
                } else if (target === "2") {
                    setValueIn1(option2);
                    setStrategy(21);
                } else if (target === "6") {
                    setValueIn9(option2);
                    setStrategy(22);
                } else if (target === "8") {
                    setValueIn9(option2);
                    setStrategy(23);
                } else if (target === "9") {
                    setValueIn6(option2);
                    setStrategy(24);
                }
            } else if (strategy === 18) {
                if (target === "2" || target === "4" || target === "8" || target === "7") {
                    setValueIn1(option2)
                    setWinner(false)
                } else if (target === "1") {
                    setValueIn2(option2);
                    setStrategy(25);
                }
            } else if (strategy === 19) {
                if (target === "2" || target === "4" || target === "6" || target === "7") {
                    setValueIn1(option2)
                    setWinner(false)
                } else if (target === "1") {
                    setValueIn2(option2);
                    setStrategy(26);
                }
            } else if (strategy === 20) {
                if (target === "2" || target === "4" || target === "8" || target === "9") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "6") {
                    setValueIn2(option2);
                    setStrategy(27);
                }
            } else if (strategy === 21) {
                if (target === "2" || target === "4" || target === "8" || target === "9") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "6") {
                    setValueIn9(option2);
                    setStrategy(28);
                }
            } else if (strategy === 22) {
                if (target === "1" || target === "3" || target === "4" || target === "6") {
                    setValueIn2(option2)
                    setWinner(false)
                } else if (target === "2") {
                    setValueIn4(option2);
                    setStrategy(29);
                }
            } else if (strategy === 23) {
                if (target === "3" || target === "4" || target === "8" || target === "6") {
                    setValueIn9(option2)
                    setWinner(false)
                } else if (target === "9") {
                    setValueIn8(option2);
                    setStrategy(30);
                }
            } else if (strategy === 24) {
                if (target === "2" || target === "3" || target === "8" || target === "6") {
                    setValueIn9(option2)
                    setWinner(false)
                } else if (target === "9") {
                    setValueIn8(option2);
                    setStrategy(31);
                }
            } else if (strategy === 25) {
                if (target === "2" || target === "3" || target === "8" || target === "4") {
                    setValueIn1(option2)
                    setWinner(false)
                } else if (target === "1") {
                    setValueIn4(option2);
                    setStrategy(32);
                }
            } else if (strategy === 26) {
                if (target === "2" || target === "3" || target === "6" || target === "4") {
                    setValueIn1(option2)
                    setWinner(false)
                } else if (target === "1") {
                    setValueIn4(option2);
                    setStrategy(33);
                }
            } else if (strategy === 27) {
                if (target === "2" || target === "3" || target === "7" || target === "8") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "6") {
                    setValueIn3(option2);
                    setStrategy(34);
                }
            } else if (strategy === 28) {
                if (target === "1" || target === "2" || target === "7" || target === "8") {
                    setValueIn4(option2)
                    setWinner(false)
                } else if (target === "4") {
                    setValueIn2(option2);
                    setStrategy(35);
                }
            } else if (strategy === 29) {
                if (target === "1" || target === "3" || target === "7" || target === "8") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "6") {
                    setValueIn3(option2);
                    setStrategy(36);
                }
            } else if (strategy === 30) {
                if (target === "1" || target === "2" || target === "6" || target === "8") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn6(option2);
                    setStrategy(37);
                }
            } else if (strategy === 31) {
                if (target === "1" || target === "2" || target === "4" || target === "8") {
                    setValueIn7(option2)
                    setWinner(false)
                } else if (target === "7") {
                    setValueIn8(option2);
                    setStrategy(38);
                }
            } else if (strategy === 32) {
                if (target === "1" || target === "2" || target === "4" || target === "6") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn6(option2);
                    setStrategy(39);
                }
            } else if (strategy === 33) {
                if (target === "4" || target === "8" || target === "9" || target === "6") {
                    setValueIn7(option2)
                    setWinner(false)
                } else if (target === "7") {
                    setValueIn4(option2);
                    setStrategy(40);
                }
            } else if (strategy === 34) {
                if (target === "4" || target === "6" || target === "7" || target === "8") {
                    setValueIn9(option2)
                    setWinner(false)
                } else if (target === "9") {
                    setValueIn6(option2);
                    setStrategy(41);
                }
            } else if (strategy === 35) {
                if (target === "3" || target === "4" || target === "6" || target === "8") {
                    setValueIn9(option2)
                    setWinner(false)
                } else if (target === "9") {
                    setValueIn8(option2);
                    setStrategy(42);
                }
            } else if (strategy === 36) {
                if (target === "1" || target === "3" || target === "7" || target === "8") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "6") {
                    setValueIn3(option2);
                    setStrategy(43);
                }
            } else if (strategy === 37) {
                if (target === "1" || target === "6" || target === "8" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn1(option2);
                    setStrategy(44);
                }
            } else if (strategy === 38) {
                if (target === "1" || target === "4" || target === "8" || target === "9") {
                    setValueIn7(option2)
                    setWinner(false)
                } else if (target === "7") {
                    setValueIn1(option2);
                    setStrategy(44);
                }
            } else if (strategy === 39) {
                if (target === "1" || target === "4" || target === "6" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn1(option2);
                    setStrategy(45);
                }
            } else if (strategy === 40) {
                if (target === "2" || target === "8" || target === "6" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn2(option2);
                    setStrategy(46);
                }
            } else if (strategy === 41) {
                if (target === "2" || target === "6" || target === "7" || target === "8") {
                    setValueIn9(option2)
                    setWinner(false)
                } else if (target === "9") {
                    setValueIn6(option2);
                    setStrategy(47);
                }
            } else if (strategy === 42) {
                if (target === "2" || target === "3" || target === "6" || target === "8") {
                    setValueIn9(option2)
                    setWinner(false)
                } else if (target === "9") {
                    setValueIn8(option2);
                    setStrategy(48);
                }
            } else if (strategy === 43) {
                if (target === "1" || target === "3" || target === "6" || target === "7") {
                    setValueIn2(option2)
                    setWinner(false)
                } else if (target === "2") {
                    setValueIn7(option2);
                    setStrategy(49);
                }
            } else if (strategy === 44) {
                if (target === "1" || target === "3" || target === "8" || target === "9") {
                    setValueIn7(option2)
                    setWinner(false)
                } else if (target === "7") {
                    setValueIn1(option2);
                    setStrategy(50);
                }
            } else if (strategy === 45) {
                if (target === "1" || target === "2" || target === "6" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn1(option2);
                    setStrategy(51);
                }
            } else if (strategy === 46) {
                if (target === "3" || target === "4" || target === "7" || target === "9") {
                    setValueIn8(option2)
                    setWinner(false)
                } else if (target === "8") {
                    setValueIn7(option2);
                    setStrategy(52);
                }
            } else if (strategy === 47) {
                if (target === "2" || target === "4" || target === "7" || target === "8") {
                    setValueIn1(option2)
                    setWinner(false)
                } else if (target === "1") {
                    setValueIn2(option2);
                    setStrategy(53);
                }
            } else if (strategy === 48) {
                if (target === "1" || target === "3" || target === "4" || target === "9") {
                    setValueIn8(option2)
                    setWinner(false)
                } else if (target === "8") {
                    setValueIn9(option2);
                    setStrategy(54);
                }
            } else if (strategy === 49) {
                if (target === "1" || target === "2" || target === "3" || target === "8") {
                    setValueIn7(option2)
                    setWinner(false)
                } else if (target === "7") {
                    setValueIn8(option2);
                    setStrategy(55);
                }
            } else if (strategy === 50) {
                if (target === "1" || target === "4" || target === "8" || target === "9") {
                    setValueIn7(option2)
                    setWinner(false)
                } else if (target === "7") {
                    setValueIn9(option2);
                    setStrategy(56);
                }
            } else if (strategy === 51) {
                if (target === "1" || target === "2" || target === "4" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn9(option2);
                    setStrategy(57);
                }
            } else if (strategy === 52) {
                if (target === "2" || target === "4" || target === "6" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn2(option2);
                    setStrategy(58);
                }
            } else if (strategy === 53) {
                if (target === "2" || target === "4" || target === "6" || target === "7") {
                    setValueIn1(option2)
                    setWinner(false)
                } else if (target === "1") {
                    setValueIn2(option2);
                    setStrategy(59);
                }
            } else if (strategy === 54) {
                if (target === "2" || target === "3" || target === "4" || target === "6") {
                    setValueIn1(option2)
                    setWinner(false)
                } else if (target === "1") {
                    setValueIn4(option2);
                    setStrategy(60);
                }
            } else if (strategy === 55) {
                if (target === "1" || target === "2" || target === "4" || target === "6") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn6(option2);
                    setStrategy(61);
                }
            } else if (strategy === 56) {
                if (target === "1" || target === "9" || target === "4" || target === "6") {
                    setValueIn7(option2)
                    setWinner(false)
                } else if (target === "7") {
                    setValueIn9(option2);
                    setStrategy(62);
                }
            } else if (strategy === 57) {
                if (target === "2" || target === "3" || target === "6" || target === "7") {
                    setValueIn9(option2)
                    setWinner(false)
                } else if (target === "9") {
                    setValueIn7(option2);
                    setStrategy(63);
                }
            } else if (strategy === 58) {
                if (target === "1" || target === "2" || target === "4" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn9(option2);
                    setStrategy(64);
                }
            }
        }

        if (step === 4) {
            if (strategy === 1) {
                if (target === "6" || target === "9") {
                    setValueIn4(option2);
                    setStrategy(1);
                } else if (target === "4" || target === "7") {
                    setValueIn6(option2)
                }
            } else if (strategy === 2) {
                if (target === "8" || target === "9") {
                    setValueIn2(option2)
                } else if (target === "2") {
                    setValueIn8(option2)
                }
            } else if (strategy === 3) {
                if (target === "6" || target === "9") {
                    setValueIn4(option2)
                    setWinner(false)
                } else if (target === "4") {
                    setValueIn9(option2)
                    setWinner(false)
                }
            } else if (strategy === 4) {
                if (target === "7" || target === "9") {
                    setValueIn3(option2)
                } else if (target === "3") {
                    setValueIn7(option2)
                }
            } else if (strategy === 5) {
                if (target === "8" || target === "9") {
                    setValueIn2(option2)
                    setWinner(false);
                } else if (target === "2") {
                    setValueIn9(option2)
                    setWinner(false);
                }
            } else if (strategy === 6) {
                if (target === "8" || target === "9") {
                    setValueIn2(option2)
                    setWinner(false);
                } else if (target === "2") {
                    setValueIn8(option2)
                }
            } else if (strategy === 7) {
                if (target === "4") {
                    setValueIn6(option2)
                } else if (target === "6" || target === "9") {
                    setValueIn4(option2)
                }
            } else if (strategy === 8) {
                if (target === "8") {
                    setValueIn2(option2)
                } else if (target === "2" || target === "3") {
                    setValueIn8(option2)
                }
            } else if (strategy === 9) {
                if (target === "4") {
                    setValueIn7(option2)
                } else if (target === "7" || target === "9") {
                    setValueIn4(option2)
                    setWinner(false);
                }
            } else if (strategy === 10) {
                if (target === "8") {
                    setValueIn9(option2)
                } else if (target === "3" || target === "9") {
                    setValueIn8(option2)
                    setWinner(false);
                }
            } else if (strategy === 11) {
                if (target === "7") {
                    setValueIn8(option2)
                } else if (target === "2" || target === "8") {
                    setValueIn7(option2)
                    setWinner(false);
                }
            } else if (strategy === 12) {
                if (target === "6") {
                    setValueIn9(option2)
                } else if (target === "8" || target === "9") {
                    setValueIn6(option2)
                    setWinner(false);
                }
            } else if (strategy === 13) {
                if (target === "8") {
                    setValueIn9(option2)
                } else if (target === "6" || target === "9") {
                    setValueIn7(option2)
                    setWinner(false);
                }
            } else if (strategy === 14) {
                if (target === "7") {
                    setValueIn4(option2)
                } else if (target === "4" || target === "8") {
                    setValueIn7(option2)
                    setWinner(false);
                }
            } else if (strategy === 15) {
                if (target === "3") {
                    setValueIn2(option2)
                } else if (target === "2" || target === "8") {
                    setValueIn3(option2)
                    setWinner(false);
                }
            } else if (strategy === 16) {
                if (target === "8") {
                    setValueIn4(option2)
                } else if (target === "4" || target === "7") {
                    setValueIn8(option2)
                    setWinner(false);
                }
            } else if (strategy === 17) {
                if (target === "2" || target === "7") {
                    setValueIn3(option2)
                } else if (target === "3") {
                    setValueIn2(option2)
                }
            } else if (strategy === 18) {
                if (target === "1" || target === "7") {
                    setValueIn8(option2)
                    setWinner(false);
                } else if (target === "8") {
                    setValueIn7(option2)
                }
            } else if (strategy === 19) {
                if (target === "8" || target === "7") {
                    setValueIn4(option2)
                    setWinner(false);
                } else if (target === "4") {
                    setValueIn7(option2)
                }
            } else if (strategy === 20) {
                if (target === "6" || target === "9") {
                    setValueIn8(option2)
                    setWinner(false);
                } else if (target === "8") {
                    setValueIn9(option2)
                }
            } else if (strategy === 21) {
                if (target === "6" || target === "8") {
                    setValueIn9(option2)
                    setWinner(false);
                } else if (target === "9") {
                    setValueIn8(option2)
                }
            } else if (strategy === 22) {
                if (target === "2" || target === "8") {
                    setValueIn1(option2)
                    setWinner(false);
                } else if (target === "1") {
                    setValueIn2(option2)
                }
            } else if (strategy === 23) {
                if (target === "2" || target === "6") {
                    setValueIn1(option2)
                    setWinner(false);
                } else if (target === "1") {
                    setValueIn2(option2)
                }
            } else if (strategy === 24) {
                if (target === "2" || target === "8") {
                    setValueIn1(option2)
                } else if (target === "1") {
                    setValueIn2(option2)
                }
            } else if (strategy === 25) {
                if (target === "4" || target === "7") {
                    setValueIn8(option2)
                    setWinner(false);
                } else if (target === "8") {
                    setValueIn7(option2)
                }
            } else if (strategy === 26) {
                if (target === "4" || target === "6") {
                    setValueIn7(option2)
                } else if (target === "7") {
                    setValueIn4(option2)
                }
            } else if (strategy === 27) {
                if (target === "3" || target === "9") {
                    setValueIn8(option2)
                    setWinner(false);
                } else if (target === "8") {
                    setValueIn9(option2)
                }
            } else if (strategy === 28) {
                if (target === "2" || target === "8") {
                    setValueIn1(option2)
                    setWinner(false);
                } else if (target === "1") {
                    setValueIn2(option2)
                }
            } else if (strategy === 29) {
                if (target === "1" || target === "3") {
                    setValueIn6(option2)
                    setWinner(false);
                } else if (target === "6") {
                    setValueIn3(option2)
                }
            } else if (strategy === 30) {
                if (target === "4" || target === "3") {
                    setValueIn6(option2)
                } else if (target === "6") {
                    setValueIn3(option2)
                }
            } else if (strategy === 31) {
                if (target === "6" || target === "3") {
                    setValueIn2(option2)
                    setWinner(false);
                } else if (target === "2") {
                    setValueIn3(option2)
                }
            } else if (strategy === 32) {
                if (target === "8" || target === "3") {
                    setValueIn2(option2)
                } else if (target === "2") {
                    setValueIn3(option2)
                }
            } else if (strategy === 33) {
                if (target === "2" || target === "3") {
                    setValueIn6(option2)
                    setWinner(false);
                } else if (target === "6") {
                    setValueIn3(option2)
                }
            } else if (strategy === 34) {
                if (target === "2" || target === "8") {
                    setValueIn7(option2)
                    setWinner(false);
                } else if (target === "7") {
                    setValueIn8(option2)
                }
            } else if (strategy === 35) {
                if (target === "1" || target === "7") {
                    setValueIn8(option2)
                    setWinner(false);
                } else if (target === "8") {
                    setValueIn1(option2)
                }
            } else if (strategy === 36) {
                if (target === "1" || target === "8") {
                    setValueIn7(option2)
                    setWinner(false);
                } else if (target === "7") {
                    setValueIn1(option2)
                }
            } else if (strategy === 37) {
                if (target === "1" || target === "8") {
                    setValueIn2(option2)
                } else if (target === "2") {
                    setValueIn1(option2)
                }
            } else if (strategy === 38) {
                if (target === "1" || target === "4") {
                    setValueIn2(option2)
                    setWinner(false);
                } else if (target === "2") {
                    setValueIn1(option2)
                }
            } else if (strategy === 39) {
                if (target === "1" || target === "2") {
                    setValueIn4(option2)
                    setWinner(false);
                } else if (target === "4") {
                    setValueIn1(option2)
                }
            } else if (strategy === 40) {
                if (target === "9" || target === "8") {
                    setValueIn6(option2)
                    setWinner(false);
                } else if (target === "6") {
                    setValueIn8(option2)
                }
            } else if (strategy === 41) {
                if (target === "7" || target === "8") {
                    setValueIn4(option2)
                    setWinner(false);
                } else if (target === "4") {
                    setValueIn8(option2)
                }
            } else if (strategy === 42) {
                if (target === "4" || target === "6") {
                    setValueIn3(option2)
                } else if (target === "3") {
                    setValueIn6(option2)
                }
            } else if (strategy === 43) {
                if (target === "1" || target === "8") {
                    setValueIn7(option2)
                    setWinner(false);
                } else if (target === "7") {
                    setValueIn8(option2)
                }
            } else if (strategy === 44) {
                if (target === "4" || target === "8") {
                    setValueIn9(option2)
                    setWinner(false);
                } else if (target === "9") {
                    setValueIn8(option2)
                }
            } else if (strategy === 45) {
                if (target === "4" || target === "6") {
                    setValueIn9(option2)
                    setWinner(false);
                } else if (target === "9") {
                    setValueIn4(option2)
                    setWinner(false);
                }
            } else if (strategy === 46) {
                if (target === "6" || target === "9") {
                    setValueIn8(option2)
                    setWinner(false);
                } else if (target === "8") {
                    setValueIn9(option2)
                }
            } else if (strategy === 47) {
                if (target === "7" || target === "2") {
                    setValueIn8(option2)
                } else if (target === "8") {
                    setValueIn7(option2)
                }
            } else if (strategy === 48) {
                if (target === "3" || target === "6") {
                    setValueIn2(option2)
                    setWinner(false);
                } else if (target === "2") {
                    setValueIn3(option2)
                }
            } else if (strategy === 49) {
                if (target === "1" || target === "6") {
                    setValueIn3(option2)
                    setWinner(false);
                } else if (target === "3") {
                    setValueIn6(option2)
                }
            } else if (strategy === 50) {
                if (target === "2" || target === "6") {
                    setValueIn9(option2)
                    setWinner(false);
                } else if (target === "9" || target === "8") {
                    setValueIn2(option2)
                    setWinner(false);
                }
            } else if (strategy === 51) {
                if (target === "2" || target === "6") {
                    setValueIn9(option2)
                    setWinner(false);
                } else if (target === "9") {
                    setValueIn6(option2)
                }
            } else if (strategy === 52) {
                if (target === "4" || target === "9") {
                    setValueIn3(option2)
                    setWinner(false);
                } else if (target === "3") {
                    setValueIn9(option2)
                }
            } else if (strategy === 53) {
                if (target === "4" || target === "7") {
                    setValueIn8(option2)
                    setWinner(false);
                } else if (target === "8") {
                    setValueIn7(option2)
                }
            } else if (strategy === 54) {
                if (target === "3" || target === "4") {
                    setValueIn1(option2)
                    setWinner(false);
                } else if (target === "1") {
                    setValueIn3(option2)
                }
            } else if (strategy === 55) {
                if (target === "1" || target === "4") {
                    setValueIn2(option2)
                    setWinner(false);
                } else if (target === "2") {
                    setValueIn1(option2)
                }
            } else if (strategy === 56) {
                if (target === "8" || target === "4") {
                    setValueIn1(option2)
                    setWinner(false);
                } else if (target === "1") {
                    setValueIn4(option2)
                }
            } else if (strategy === 57) {
                if (target === "2" || target === "4") {
                    setValueIn1(option2)
                    setWinner(false);
                } else if (target === "1") {
                    setValueIn4(option2)
                }
            } else if (strategy === 58) {
                if (target === "9" || target === "4") {
                    setValueIn6(option2)
                } else if (target === "6") {
                    setValueIn9(option2)
                }
            } else if (strategy === 59) {
                if (target === "7" || target === "6") {
                    setValueIn4(option2)
                } else if (target === "4") {
                    setValueIn7(option2)
                }
            } else if (strategy === 60) {
                if (target === "2" || target === "3") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "6") {
                    setValueIn3(option2)
                }
            } else if (strategy === 61) {
                if (target === "1" || target === "2") {
                    setValueIn4(option2)
                    setWinner(false)
                } else if (target === "4") {
                    setValueIn2(option2)
                }
            } else if (strategy === 62) {
                if (target === "1" || target === "4") {
                    setValueIn6(option2)
                    setWinner(false)
                } else if (target === "6") {
                    setValueIn1(option2)
                    setWinner(false)
                }
            } else if (strategy === 63) {
                if (target === "2" || target === "6") {
                    setValueIn3(option2)
                    setWinner(false)
                } else if (target === "3") {
                    setValueIn6(option2)
                }
            } else if (strategy === 64) {
                if (target === "2" || target === "4") {
                    setValueIn1(option2)
                    setWinner(false)
                } else if (target === "1") {
                    setValueIn2(option2)
                }
            }
        }
    }

    const displayOption = (target,option) => {
        if (target === "1") {
            setValueIn1(option);
        } else if (target === "2") {
            setValueIn2(option);
        } else if (target === "3") {
            setValueIn3(option);
        } else if (target === "4") {
            setValueIn4(option);
        } else if (target === "5") {
            setValueIn5(option);
        } else if (target === "6") {
            setValueIn6(option);
        } else if (target === "7") {
            setValueIn7(option);
        } else if (target === "8") {
            setValueIn8(option);
        } else if (target === "9") {
            setValueIn9(option);
        }
    }

    return (
        <div className="container">
            <header style={{opacity:"0.8"}}> 
                <NavLink to={`/detail/${state.mode}`} className="start-game"><i className="fas fa-chevron-left"></i></NavLink>
                <div className="game-name">Tic Tac Toe</div>
                <div onClick = {resetSteps}className="start-game"><i class="fas fa-redo"></i></div>  
            </header>
            <div className="selection-container">
                <div className = "choice-selection"onChange={e => onChangeValue(e)}>
                    <label className= "first-move">1st Move</label>
                    <div className="options-container">
                        <div className={`options ${option === "x" ? "active" : ""}`}>
                            <label for="x" className="optionx">x</label>
                            <input id="x" className="option" type="radio" value="x" name="option" />
                        </div>
                        <div className={`options ${option === "o" ? "active" : ""}`}>
                            <label for="o">O</label>
                            <input id="o" className="option" type="radio" value="o" name="option" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="board">
                <div className={`line ${presentation}`}></div>
                <div className="grid-container" onClick={e => handleClick(e)}>
                    <div className={`grid-item ${value_1 ? "disable" : ""} ${value_1 === option ? "active" : ""}`} id="1">{value_1}</div>
                    <div className={`grid-item ${value_2 ? "disable" : ""} ${value_2 === option ? "active" : ""}`} id="2">{value_2}</div>
                    <div className={`grid-item ${value_3 ? "disable" : ""} ${value_3 === option ? "active" : ""}`} id="3">{value_3}</div>
                    <div className={`grid-item ${value_4 ? "disable" : ""} ${value_4 === option ? "active" : ""}`} id="4">{value_4}</div>
                    <div className={`grid-item ${value_5 ? "disable" : ""} ${value_5 === option ? "active" : ""}`} id="5">{value_5}</div>
                    <div className={`grid-item ${value_6 ? "disable" : ""} ${value_6 === option ? "active" : ""}`} id="6">{value_6}</div>
                    <div className={`grid-item ${value_7 ? "disable" : ""} ${value_7 === option ? "active" : ""}`} id="7">{value_7}</div>
                    <div className={`grid-item ${value_8 ? "disable" : ""} ${value_8 === option ? "active" : ""}`} id="8">{value_8}</div>
                    <div className={`grid-item ${value_9 ? "disable" : ""} ${value_9 === option ? "active" : ""}`} id="9">{value_9}</div>
                </div>
            </div>
            <div className={`${result===""?"hidden":"result "}`}>
                <div className= "first-move">{result}</div>
                <button onClick = {resetSteps}className="start-game-btn">New Game</button>  
            </div>
            <footer style={{height:"100px",background:"#264653"}}>
                <div className="turn"> X </div>
                <div>{state.name.user || "Player 1"}:</div>
                <div className="score">{scoreX}</div>
                <div className="vert-line"></div>
                <div className="turn"> O </div>
                <div>{state.name.opponent || "Player 2"}:</div>
                <div className="score">{scoreO}</div>
            </footer>
        </div>
    )
}

export default Game
