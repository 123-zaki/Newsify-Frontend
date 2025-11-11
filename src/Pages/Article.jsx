import React from "react";
import Header from "../Components/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Article() {
    const {id} = useParams();
  const { article } = useLocation().state;
  const navigate = useNavigate();

  const share = () => {
    if(navigator.share) {
        navigator.share({
            title: 'Breaking News!',
            text: "Check out this amazing article🔥🔥",
            url: `https://newsify.netlify.app/article/${id}`
        }).then(() => {
            console.log("Shared Successfully...!")
        }).catch((err) => console.log("Error in sharing article...⚠️", err));
    } else {
        alert("This browser does not support sharing...🚨");
    }
  };
  return (
    <>
      <main className="mt-34">
        <button className="shadow-lg px-4 py-2 rounded-lg hover:shadow-md cursor-pointer bg-(--bg) text-(--text) text-lg ml-2 sm:ml-4" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="shadow-xl hover:shadow-2xl sm:rounded-2xl rounded-lg hover:rounded-br-3xl hover:rounded-tl-3xl w-[calc(100%-16px)] sm:w-[calc(100%-32px)] mt-2 sm:mt-4 lg:mt-0 mx-auto max-w-[800px] bg-(--bg) overflow-hidden">
          <img
            src={
              article.urlToImage ||
              "https://images.unsplash.com/photo-1503264116251-35a269479413?blur=80&auto=format&fit=crop&w=800&q=20"
            }
            alt="article-image"
            className="w-full sm:h-70 object-cover"
          />
          <div>
            <h1 className="text-md sm:text-xl sm:font-semibold text-(--text) px-4 mt-1 sm:mt-3">
              {article.title}
            </h1>
            <p className="text-(--text) text-xs sm:text-sm px-4 my-2 sm:my-3">
              {article.description}
            </p>
            <div className="flex justify-center mb-3">
              <button className="px-4 py-2 sm:py-2 rounded-xl shadow-lg hover:shadow-md bg-(--bg-body) text-(--text) mt-1 sm:mt-0 sm:text-xl font-semibold cursor-pointer flex items-center gap-2 justify-center" onClick={share}>
                Share
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="18"
                  height="18"
                  viewBox="0 0 172 172"
                  style={{ fill: "#000000" }}
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style={{ mixBlendMode: "normal" }}
                  >
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g>
                      <path
                        fill="#49C496"
                        d="M129,14.33333c-11.78924,0 -21.5,9.71076 -21.5,21.5c0,1.3685 0.15617,2.70271 0.40593,4.00326l-51.13249,29.82845c-3.75057,-3.17375 -8.52688,-5.16504 -13.77344,-5.16504c-11.78924,0 -21.5,9.71076 -21.5,21.5c0,11.78924 9.71076,21.5 21.5,21.5c5.24655,0 10.02287,-1.99129 13.77344,-5.16504l51.13249,29.81445c-0.25145,1.30477 -0.40593,2.64402 -0.40593,4.01725c0,11.78924 9.71076,21.5 21.5,21.5c11.78924,0 21.5,-9.71076 21.5,-21.5c0,-11.78924 -9.71076,-21.5 -21.5,-21.5c-5.24973,0 -10.02192,2.00185 -13.77344,5.17903l-51.13249,-29.84244c0.24976,-1.30055 0.40592,-2.63476 0.40592,-4.00326c0,-1.3685 -0.15617,-2.70271 -0.40592,-4.00326l51.13249,-29.82845c3.75057,3.17375 8.52689,5.16504 13.77344,5.16504c11.78924,0 21.5,-9.71076 21.5,-21.5c0,-11.78924 -9.71076,-21.5 -21.5,-21.5zM129,28.66667c4.04292,0 7.16667,3.12374 7.16667,7.16667c0,4.04293 -3.12374,7.16667 -7.16667,7.16667c-4.04292,0 -7.16667,-3.12374 -7.16667,-7.16667c0,-4.04293 3.12374,-7.16667 7.16667,-7.16667zM43,78.83333c4.04293,0 7.16667,3.12374 7.16667,7.16667c0,4.04292 -3.12374,7.16667 -7.16667,7.16667c-4.04293,0 -7.16667,-3.12374 -7.16667,-7.16667c0,-4.04292 3.12374,-7.16667 7.16667,-7.16667zM129,129c4.04292,0 7.16667,3.12374 7.16667,7.16667c0,4.04292 -3.12374,7.16667 -7.16667,7.16667c-4.04292,0 -7.16667,-3.12374 -7.16667,-7.16667c0,-4.04292 3.12374,-7.16667 7.16667,-7.16667z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
