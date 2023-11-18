import axios from "axios";
import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function getXY() {
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
    return coordinates[index];
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    if (yon === "right") {
      if (index % 3 !== 2) {
        setIndex(index + 1);
        setSteps(steps + 1);
      } else {
        setMessage("Sağa gidemezsiniz");
      }
    } else if (yon === "left") {
      if (index % 3 !== 0) {
        setIndex(index - 1);
        setSteps(steps + 1);
      } else {
        setMessage("Sola gidemezsiniz");
      }
    } else if (yon === "up") {
      if (index > 2) {
        setIndex(index - 3);
        setSteps(steps + 1);
      } else {
        setMessage("Yukarıya gidemezsiniz");
      }
    } else if (yon === "down") {
      if (index < 6) {
        setIndex(index + 3);
        setSteps(steps + 1);
      } else {
        setMessage("Aşağıya gidemezsiniz");
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
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
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
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button
          id="left"
          onClick={(e) => {
            sonrakiIndex(e.target.id);
          }}
        >
          SOL
        </button>
        <button
          id="up"
          onClick={(e) => {
            sonrakiIndex(e.target.id);
          }}
        >
          YUKARI
        </button>
        <button
          id="right"
          onClick={(e) => {
            sonrakiIndex(e.target.id);
          }}
        >
          SAĞ
        </button>
        <button
          id="down"
          onClick={(e) => {
            sonrakiIndex(e.target.id);
          }}
        >
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          value={email}
          onChange={(e) => changeHandler(e)}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
