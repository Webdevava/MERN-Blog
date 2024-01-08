import React, { useContext } from "react";
import "../Styles/Sidebar.scss";
import { ThemeContext } from "../App";

const Sidebar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`sidebar ${theme}`}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi et magnam
        facere ut, quo amet architecto optio inventore, suscipit voluptatem
        molestiae aut adipisci recusandae consequuntur laboriosam repellat
        nesciunt exercitationem. Doloremque sed quaerat labore totam maxime
        facere ratione porro, libero qui aliquid, possimus, a rem. Provident
        velit iste sapiente molestias, repellendus quod illum totam dolore modi
        quos ipsum pariatur fuga labore maiores nostrum, magni possimus corporis
        ut blanditiis, veniam ad. Cupiditate iste modi ea assumenda ex, at
        culpa. Necessitatibus, alias labore at unde totam dolores aspernatur?
        Exercitationem iusto quam molestias, rem architecto atque. Atque est
        quas impedit blanditiis iure. Molestiae maiores recusandae assumenda
        inventore quibusdam repellat reprehenderit debitis, aut deserunt optio
        suscipit explicabo tempore? Quod at porro deleniti veritatis atque
        facere. At numquam quae perferendis! Magni ipsa iste in alias sapiente
        consequatur natus modi nam nulla impedit! Nobis quae magnam deserunt,
        modi harum laudantium voluptas fugiat ullam, dignissimos iste explicabo
        corporis? Distinctio voluptatibus, veritatis id eligendi omnis qui illum
        veniam nesciunt excepturi explicabo, quam magnam ea? Nihil sequi itaque
        accusamus laboriosam recusandae dolores voluptas cupiditate, animi
        tempore! Eligendi eius quis, quasi suscipit perferendis ut minima
        aperiam. Sed laborum a quasi voluptatum. Praesentium impedit officia
        totam nobis tenetur debitis qui ipsa architecto.
      </p>
    </div>
  );
};

export default Sidebar;
