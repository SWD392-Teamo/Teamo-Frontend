
const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen z-50">
      <video autoPlay loop className="w-[200px] h-[200px]">
        <source src='/loading.webm' type="video/webm" />
      </video>
    </div>
  );
};

export default Loading;