let model; // 전역 변수로 학습된 모델을 저장하여 나중에 접근 가능하도록 설정

// 주택 데이터셋을 가져오는 함수 (비동기 함수로 fetch를 사용)
async function fetchHousingData() {
    const response = await fetch('https://raw.githubusercontent.com/selva86/datasets/master/BostonHousing.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1).filter(row => row.length > 0);
    const parsedData = rows.map(row => {
        const cols = row.split(',');
        return {
            crim: parseFloat(cols[0]),   // 범죄율 (CRIM)
            rm: parseFloat(cols[5]),     // 방 개수 (RM)
            lstat: parseFloat(cols[12]), // 저소득층 비율 (LSTAT)
            medv: parseFloat(cols[13])   // 중간 주택 가격 (MEDV)
        };
    });
    return parsedData;
}

// 다중회귀 모델을 학습시키고, 예측 결과를 표시하는 메인 함수
async function run() {
    // 로딩 메시지를 표시
    document.getElementById('loading-message').style.display = 'block';

    const data = await fetchHousingData();
    const dataX = data.map(d => [d.crim, d.rm, d.lstat]); // CRIM, RM, LSTAT 값을 입력 데이터로 추출
    const dataY = data.map(d => d.medv); // MEDV 값을 출력 데이터로 추출

    const tensorX = tf.tensor2d(dataX, [dataX.length, 3]); // 입력 데이터를 2D 텐서로 변환 (행: 샘플 수, 열: 독립변수 수)
    const tensorY = tf.tensor2d(dataY, [dataY.length, 1]); // 출력 데이터를 2D 텐서로 변환

    model = tf.sequential();
    model.add(tf.layers.dense({
        units: 1,
        inputShape: [3],
        kernelInitializer: 'zeros', // 가중치 초기화를 추가
        biasInitializer: 'zeros' // 편향 초기화를 추가
    }));
    model.compile({loss: 'meanSquaredError', optimizer: tf.train.sgd(0.001)}); // 학습률을 명시적으로 설정

    await model.fit(tensorX, tensorY, {
        epochs: 500,
        batchSize: 32, // 배치 사이즈 추가
        shuffle: true // 데이터를 셔플하여 학습
    });

    const predictions = model.predict(tensorX).dataSync(); // 학습된 모델로 예측 수행, 결과를 동기적으로 가져옴

    displayPredictions(dataY, predictions); // 실제 값과 예측 값을 리스트로 표시

    // 로딩 메시지를 숨김
    document.getElementById('loading-message').style.display = 'none';

    document.getElementById('result-container').style.display = 'block'; // 결과 컨테이너를 화면에 표시
}

// 실제 값과 예측 값을 리스트로 표시하는 함수
function displayPredictions(actualValues, predictions) {
    const predictionsList = document.getElementById('predictions-list');
    predictionsList.innerHTML = ''; // 기존 리스트 초기화

    predictions.forEach((pred, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `실제값: ${actualValues[index].toFixed(2)}, 예측값: ${pred.toFixed(2)}`;
        predictionsList.appendChild(listItem);
    });
}

// 입력된 값을 바탕으로 예측 가격을 계산하고 표시하는 함수
function predictPrice() {
    const crimInput = parseFloat(document.getElementById('crimInput').value);
    const roomsInput = parseFloat(document.getElementById('roomsInput').value);
    const lstatInput = parseFloat(document.getElementById('lstatInput').value);

    if (!isNaN(crimInput) && !isNaN(roomsInput) && !isNaN(lstatInput) && model) {
        const inputTensor = tf.tensor2d([[crimInput, roomsInput, lstatInput]], [1, 3]); // 입력 값을 2D 텐서로 변환
        let prediction = model.predict(inputTensor).dataSync()[0]; // 모델을 사용하여 가격 예측 수행

        if (prediction < 0) {
            prediction = 0; // 예측값이 음수인 경우 0으로 제한
        }

        document.getElementById('singlePrediction').textContent = `예측된 가격: ${prediction.toFixed(2)}`; // 예측 결과를 화면에 표시
    } else {
        document.getElementById('singlePrediction').textContent = '모든 값을 입력해주세요!'; // 모든 값을 입력하지 않은 경우 경고 메시지 표시
    }
}

// 버튼 클릭 이벤트 리스너 추가
document.getElementById('showButton').addEventListener('click', run); // '분석 결과 차트 보기' 버튼 클릭 시 run 함수 실행
document.getElementById('predictButton').addEventListener('click', predictPrice); // '예측가격 확인' 버튼 클릭 시 predictPrice 함수 실행
