import { useState } from "react";
import "./iteam.css";


export default function Item({ item }) {
    const separateWords = s => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
    const formatDate = s => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });
  

    return (
  
  <li className="item">
        {item.urlToImage &&
          <img className="thumbnail"
            alt=""
            src={item.urlToImage}
          />
        }
  
        <p className="description">
          {item.description}
        </p>
  

        <div className="meta">
          <span>{item.publishedAt}</span>
  
          <span className="provider">
            {item.source.name}
          </span>
  
            <span>{item.author}</span>
          <a href={item.url}>Read More</a>
        </div>
      </li>
    );
  }
  
  
