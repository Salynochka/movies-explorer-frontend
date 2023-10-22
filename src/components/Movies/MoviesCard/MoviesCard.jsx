import "./MoviesCard.css";

function MoviesCard(props) {
  return (
    <>
      <article className="card">
        <div className="card__info">
          <img
            className="card__photo"
            src="https://yandex-images.clstorage.net/4nGE7Q236/091624eMB0/X0RGSwvlaersAXLUVhB-GDpPgSCxOEUnAJY6KbbXEB9TxBibQDHvrnN7kP4e9lBc9NnSpLWkuDMSufZ9h3rWIRwcChhNuy7q6RU53hoKcggvA5xjpHpcIwfPNiLauGdtdKw0-TtHktg8Kc6tQ-gaSrPi6-bUg-FFYsrha4UEjlJTTHNuKMQq9fE0COxCGHMlFSaAP4F6aXcvpU5-149nSHKgGd4qRKjeIjvzoHTefHeRysyz34D_akvy3mqKJ6lsX1NQSBryCuvQARrvXzdgDxcXpCCkX3Z9E4pqR-qfYXxQkDLSOWSKwzUG77he0XJIs_juqPKA-mxrxtxIqASJf3BqdEwtzjDt8TE5xX0Ybi4BMpculUBCfCS3Umbfs2BaUokC-jpro_EHMcOjR9d7T5DR_YTyp9twQfLgRIQtilNcf2BjOMcpzcArFOZmF1YeAxOOK4dTVFACn1Rf_4xjT0KbFuwmVIvdMxLuunDRU1a19-CMw7_YbH3izWuKIa5WRklrcAn6FPLkBAnDUDRXMxoWpS2oY29cGrhDYcSTYFVZpCvkOUuP1xIb64112Vpehej7v8y8xEh2w_xtjye6c213QkQU8jPh8BkJxm0XeSUxF70hj3xUYAWnUH_0jXVeWKUj4xd4ruUULsuTXsJXXqf31qzxrcZRRtbiTKAdp2Z5YVtcIPcsyO09LdtCF2sFKDCuCLxjXk0IhENQypFhXlSQEeEeSZ3FPC3MomvpQ1GOzPCU1p74TXXP_HWNA6tSTmZqQzfFFe3kNCnrWzhwMjgLmT2QfUlWOotRa9apRV5_kDbaH22i2yMd15FX9G58tM_CkeqI31RI-tNmvBm3ZlFLfXAf3gDT5hcuwXYnTAsHOKADsn5nSR-Hfmvjo05aXIIZ-yVVsN8UGe6LSuh9XpTx5KfyovpaTszDVYQOm0JMUWRdH9gP8vsREMBgNVMxABG_BrxvRHICiHJ00Y8"
            alt="Теорема Зеро"
            onClick={props.handleClick}
          />
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">Теорема Зеро</h2>
              <form className="card__save" >
                <input className="card__save-button" type="checkbox" name="radio"/>
              </form>
            </div>
            <h2 className="card__duration">106 minutes</h2>
          </div>
        </div>
      </article>
      <article className="card">
        <div className="card__info">
          <img
            className="card__photo"
            src="https://avatars.mds.yandex.net/i?id=452aea709dd96904c00a92bcba714b03_l-8181450-images-thumbs&n=13"
            alt="Симпсоны в кино"
            onClick={props.handleClick}
          />
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">Симпсоны в кино</h2>
              <form className="card__save" >
                <input className="card__save-button" type="checkbox" name="radio"/>
              </form>
            </div>
            <h2 className="card__duration">83 minutes</h2>
          </div>
        </div>
      </article>
      <article className="card">
        <div className="card__info">
          <img
            className="card__photo"
            src="https://avatars.mds.yandex.net/i?id=1abc518defa2c78d99bb4954daa54f7d_l-4101447-images-thumbs&n=13"
            alt="Никто"
            onClick={props.handleClick}
          />
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">Никто</h2>
              <form className="card__save" >
                <input className="card__save-button" type="checkbox" name="radio"/>
              </form>
            </div>
            <h2 className="card__duration">92 minutes</h2>
          </div>
        </div>
      </article>
      <article className="card">
        <div className="card__info">
          <img
            className="card__photo"
            src="https://cdn.iportal.ru/preview/news/articles/96effb7274532d524e4659f0fa6a4fb300f830b7_1831_860.jpg"
            alt="Оппенгеймер"
            onClick={props.handleClick}
          />
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">Оппенгеймер</h2>
              <form className="card__save" >
                <input className="card__save-button" type="checkbox" name="radio"/>
              </form>
            </div>
            <h2 className="card__duration">180 minutes</h2>
          </div>
        </div>
      </article>
      <article className="card">
        <div className="card__info">
          <img
            className="card__photo"
            src="https://w.forfun.com/fetch/4f/4fa04bf7e7f6032ea073e8abdd5d7dca.jpeg"
            alt="Страх и ненависть в Лас-Вегасе"
            onClick={props.handleClick}
          />
          <div className="card__description">
            <div className="card__section">
              <h2 className="card__title">Страх и ненависть в Лас-Вегасе</h2>
              <form className="card__save" >
                <input className="card__save-button" type="checkbox" name="radio"/>
              </form>
            </div>
            <h2 className="card__duration">106 minutes</h2>
          </div>
        </div>
      </article>
    </>
  );
}

/* const initialMoviesCards = [
  {
    duration: "180",
    image:
      "https://cdn.iportal.ru/preview/news/articles/96effb7274532d524e4659f0fa6a4fb300f830b7_1831_860.jpg",
    nameRu: "Оппенгеймер",
  },
  {
    duration: "105",
    image:
      "https://avatars.mds.yandex.net/i?id=f468bf1129024e460e40856158ae752d-5606166-images-thumbs&n=13",
    nameRu: "Крупная рыба",
  },
  {
    duration: "106",
    image:
      "https://w.forfun.com/fetch/4f/4fa04bf7e7f6032ea073e8abdd5d7dca.jpeg",
    nameRu: "Страх и ненависть в Лас-Вегасе",
  },
  {
    duration: "149",
    image:
      "https://avatars.mds.yandex.net/i?id=e2fe6a0836a5e3eaf624edcfad98a331_l-8497350-images-thumbs&n=13",
    nameRu: "2001 год: Космическая одиссея ",
  },
  {
    duration: "114",
    image:
      "https://avatars.mds.yandex.net/i?id=7991f1c215734e7690ea5ca7f71348fd_l-5208510-images-thumbs&n=13",
    nameRu: "Столетний старик, который вылез в окно и исчез",
  },
  {
    duration: "100",
    image:
      "https://avatars.mds.yandex.net/i?id=a275443c20761fb72da11b540908c8e4_l-3481047-images-thumbs&n=13",
    nameRu: "День курка",
  },
  {
    duration: "98",
    image:
      "https://avatars.mds.yandex.net/i?id=1ee5a1bb791b131540c6643ce2950237_l-5366304-images-thumbs&n=13",
    nameRu: "Пушки Акимбо",
  },
  {
    duration: "97",
    image:
      "https://avatars.mds.yandex.net/i?id=d60955c16bfed62dcd2bcaa904df1ad1_l-4440117-images-thumbs&n=13",
    nameRu: "Человек — швейцарский нож",
  },
  {
    duration: "98",
    image:
      "https://avatars.mds.yandex.net/i?id=ae4c8563921946e0bc033645c9ccb3be_l-8351914-images-thumbs&ref=rim&n=13&w=1024&h=613",
    nameRu: "Патруль времени",
  },
  {
    duration: "103",
    image:
      "https://yandex-images.clstorage.net/4nGE7Q236/091624eMB0/X0RGSwvlaersAXLUVhB-GDpPgSCxOEUnAJY6KbbWFRUAxh_IEDm_o3J5lf4VpwRa896H9reg6WdBuaV9h3rbLBoTBBpIuy7q6RU53hoKcggvA5xjpHpcIwfPNiLauGdtdKw0-TtHktg8Kc6tQ-gaSrPi6-bUg-FFYsrha4UEjlJTTHNuKMQq9fE0COxCGHMlFSaAP4F6aXcvpU5-149nSHKgGd4qRKjeIjvzoHTefHeRysyz34D_akvy3mqKJ6lsX1NQSBryCuvQARrvXzdgDxcXpCCkX3Z9E4pqR-qfYXxQkDLSOWSKwzUG77he0XJIs_juqPKA-mxrxtxIqASJf3BqdEwtzjDt8TE5xX0Ybi4BMpculUBCfCS3Umbfs2BaUokC-jpro_EHMcOjR9d7T5DR_YTyp9twQfLgRIQtilNcf2BjOMcpzcArFOZmF1YeAxOOK4dTVFACn1Rf_4xjT0KbFuwmVIvdMxLuunDRU1a19-CMw7_YbH3izWuKIa5WRklrcAn6FPLkBAnDUDRXMxoWpS2oY29cGrhDYcSTYFVZpCvkOUuP1xIb64112Vpehej7v8y8xEh2w_xtjye6c213QkQU8jPh8BkJxm0XeSUxF70hj3xUYAWnUH_0jXVeWKUj4xd4ruUULsuTXsJXXqf31qzxrcZRRtbiTKAdp2Z5YVtcIPcsyO09LdtCF2sFKDCuCLxjXk0IhENQypFhXlSQEeEeSZ3FPC3MomvpQ1GOzPCU1p74TXXP_HWNA6tSTmZqQzfFFe3kNCnrWzhwMjgLmT2QfUlWOotRa9apRV5_kDbaH22i2yMd15FX9G58tM_CkeqI31RI-tNmvBm3ZlFLfXAf3gDT5hcuwXYnTAsHOKADsn5nSR-Hfmvjo05aXIIZ-yVVsN8UGe6LSuh9XpTx5KfyovpaTszDVYQOm0JMUWRdH9gP8vsREMBgNVMxABG_BrxvRHICiHJ00Y8",
    nameRu: "Неудержимые",
  },
]; */

export default MoviesCard;
