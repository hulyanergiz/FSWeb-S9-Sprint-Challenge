import React, { useState } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [indeks, setIndeks] = useState(initialIndex);
  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const coordinates = [
      "(1, 1)",
      "(2, 1)",
      "(3, 1)",
      "(1, 2)",
      "(2, 2)",
      "(3, 2)",
      "(1, 3)",
      "(2, 3)",
      "(3, 3)",
    ];
    return coordinates[indeks];
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndeks(initialIndex);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    if (yon === "up") {
      if (indeks > 2) {
        setIndeks(indeks - 3);
        setSteps(steps + 1);
      } else {
        setMessage("Yukarıya gidemezsiniz");
      }
    }
    if (yon === "down") {
      if (indeks < 6) {
        setIndeks(indeks + 3);
        setSteps(steps + 1);
      } else {
        setMessage("Aşağıya gidemezsiniz");
      }
    }
    if (yon === "left") {
      if (indeks % 3 !== 0) {
        setIndeks(indeks - 1);
        setSteps(steps + 1);
      } else {
        setMessage("Sola gidemezsiniz");
      }
    }
    if (yon === "right") {
      if (indeks % 3 !== 2) {
        setIndeks(indeks + 1);
        setSteps(steps + 1);
      } else {
        setMessage("Sağa gidemezsiniz");
      }
    }
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  }

  function changeHandler(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function submitHandler(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    const payload = {
      x: getXY().slice(1, 2),
      y: getXY().slice(4, 5),
      steps: steps,
      email: email,
    };
    setEmail(initialEmail);
    axios
      .post("http://localhost:9000/api/result", payload)
      .then(function (response) {
        console.log(response);
        setMessage(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === indeks ? " active" : ""}`}>
            {idx === indeks ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={(e) => sonrakiIndex(e.target.id)}>
          SOL
        </button>
        <button id="up" onClick={(e) => sonrakiIndex(e.target.id)}>
          YUKARI
        </button>
        <button id="right" onClick={(e) => sonrakiIndex(e.target.id)}>
          SAĞ
        </button>
        <button id="down" onClick={(e) => sonrakiIndex(e.target.id)}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          data-testid="input"
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={(e) => changeHandler(e)}
        ></input>
        <input data-testid="input" id="submit" type="submit"></input>
      </form>
    </div>
  );
}
