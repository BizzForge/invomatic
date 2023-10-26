'use client'
import { Fragment, useEffect } from 'react'
import Login from './login/page'


function loader() {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
}

export default function Home() {
  useEffect(() => {
    loader();
  }, []);
  return (
      <Fragment>
          <div class="loader" id="loader">
              <div class="loader loader--style4" title="3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  x="0"
                  y="0"
                  enableBackground="new 0 0 50 50"
                  version="1.1"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                >
                  <path fill="#333" d="M0 0H4V7H0z">
                    <animateTransform
                      attributeName="transform"
                      attributeType="xml"
                      begin="0s"
                      dur="0.6s"
                      repeatCount="indefinite"
                      type="scale"
                      values="1,1; 1,3; 1,1"
                    ></animateTransform>
                  </path>
                  <path fill="#333" d="M10 0H14V7H10z">
                    <animateTransform
                      attributeName="transform"
                      attributeType="xml"
                      begin="0.2s"
                      dur="0.6s"
                      repeatCount="indefinite"
                      type="scale"
                      values="1,1; 1,3; 1,1"
                    ></animateTransform>
                  </path>
                  <path fill="#333" d="M20 0H24V7H20z">
                    <animateTransform
                      attributeName="transform"
                      attributeType="xml"
                      begin="0.4s"
                      dur="0.6s"
                      repeatCount="indefinite"
                      type="scale"
                      values="1,1; 1,3; 1,1"
                    ></animateTransform>
                  </path>
                </svg>
              </div>
          </div>
          <Login />
      </Fragment>
  )
}
