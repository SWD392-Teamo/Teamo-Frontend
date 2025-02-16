
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <video autoPlay loop className="w-[200px] h-[200px]">
        <source src='/loading.webm' type="video/webm" />
      </video>
    </div>
  );
};

export default Loading;