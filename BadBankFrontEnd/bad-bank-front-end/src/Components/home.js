import Card from "./Card";

function Home() {
  return (
    <>
      <Card
        txtcolor="black"
        header="Welcome to the Bank of Wesam"
        text="This is the best bank in the world! Your money is perfectly safe!
              Please create an account and login to start using our services.
              You can move around using the navigation bar."
        body={<img src="bank.png" className="img-fluid" alt="Bank" />}
      />
    </>
  );
}

export default Home;
