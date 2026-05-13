import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, User, Delete, Loader2, Info, ShieldCheck, HelpCircle } from 'lucide-react';

const App = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('idle'); // idle, processing, success
  const [error, setError] = useState(null);

  const operators = ['+', '-', '*', '/'];
  const hasOperator = operators.some(op => amount.includes(op));

  const handleKeyPress = (val) => {
    if (status !== 'idle') return;
    
    if (val === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
      return;
    }

    if (val === '=') {
      calculateResult();
      return;
    }

    // Prevent multiple operators in a row
    if (operators.includes(val) && operators.includes(amount.slice(-1))) {
      return;
    }

    // Limit length to prevent UI overflow
    if (amount.length > 12 && !operators.includes(val)) return;

    setAmount(prev => prev + val);
  };

  const calculateResult = () => {
    try {
      if (!amount) return;
      const result = new Function(`return ${amount}`)();
      // Format to 2 decimal places if needed, but remove trailing zeros
      const formattedResult = Number(parseFloat(result).toFixed(2)).toString();
      setAmount(formattedResult);
    } catch (err) {
      setError('Invalid calculation');
      setTimeout(() => setError(null), 2000);
    }
  };

  const handleProceed = () => {
    if (hasOperator) {
      calculateResult();
    } else if (parseFloat(amount) > 0) {
      setStatus('processing');
      setTimeout(() => {
        setStatus('success');
      }, 2000);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-phonepe-green text-white p-6 animate-fade-in">
        <div className="bg-white rounded-full p-4 mb-6 shadow-2xl animate-bounce">
          <CheckCircle2 className="w-24 h-24 text-phonepe-green" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Payment Successful</h1>
        <p className="text-xl font-medium opacity-90 mb-8">₹{amount} sent to John Doe</p>
        
        <div className="w-full max-w-xs space-y-4">
          <div className="bg-white/10 p-4 rounded-xl border border-white/20">
            <p className="text-sm opacity-80 mb-1">Transaction ID</p>
            <p className="font-mono text-lg font-bold">T2605131234567890</p>
          </div>
          <button 
            onClick={() => { setStatus('idle'); setAmount(''); }}
            className="w-full bg-white text-phonepe-green font-bold py-4 rounded-xl shadow-xl active:scale-95 transition-transform"
          >
            VIEW DETAILS
          </button>
          <button 
            onClick={() => { setStatus('idle'); setAmount(''); }}
            className="w-full bg-transparent border-2 border-white/40 text-white font-bold py-4 rounded-xl active:scale-95 transition-transform"
          >
            DONE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fb] font-sans max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-gray-100">
      {/* Real PhonePe Header */}
      <header className="bg-phonepe-purple text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button className="mr-4 active:bg-white/10 p-1 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold leading-tight">Sending Money</h1>
          </div>
        </div>
        <HelpCircle className="w-6 h-6 opacity-80" />
      </header>

      {/* Receiver Card - Refined */}
      <div className="p-4 bg-white shadow-sm mb-4">
        <div className="flex items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-phonepe-purple to-phonepe-lightPurple rounded-2xl flex items-center justify-center text-white mr-4 shadow-lg">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900 text-lg">John Doe</h2>
            <p className="text-sm text-gray-500 font-medium tracking-wide uppercase flex items-center">
              john@ybl 
              <span className="ml-2 inline-block w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-3 h-3 text-white" />
              </span>
            </p>
          </div>
          <div className="text-phonepe-purple font-bold text-sm tracking-tight border border-phonepe-purple/20 px-3 py-1 rounded-full">
            HISTORY
          </div>
        </div>
      </div>

      {/* Amount Section - Refined */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-10">
        <div className="bg-white px-8 py-6 rounded-[2rem] shadow-inner-light border border-gray-100 flex flex-col items-center min-w-[280px]">
          <div className="flex items-center text-6xl font-black text-gray-900 tracking-tighter">
            <span className="text-4xl mr-1 self-start mt-2 font-bold text-gray-400">₹</span>
            <span className={amount === '' ? 'text-gray-200' : ''}>
              {amount || '0'}
            </span>
            {status === 'idle' && (
              <span className="w-[3px] h-12 bg-phonepe-purple ml-2 animate-pulse" />
            )}
          </div>
          <div className="h-6 mt-2">
            {hasOperator ? (
              <span className="text-blue-500 font-bold text-sm animate-pulse">Calculating...</span>
            ) : (
              amount && <span className="text-gray-400 text-sm font-medium">Entering amount</span>
            )}
            {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
          </div>
        </div>
        
        <div className="mt-8 flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
           <Info className="w-4 h-4 text-gray-400 mr-2" />
           <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Powered by UPI</p>
        </div>
      </div>

      {/* Modern PhonePe Keypad */}
      <div className="bg-[#f0f3f7] rounded-t-[2.5rem] shadow-2xl border-t border-white pt-2 overflow-hidden">
        <div className="grid grid-cols-4 gap-1 p-2">
          {[
            {val: '1', sub: ''}, {val: '2', sub: 'ABC'}, {val: '3', sub: 'DEF'}, {val: '+', op: true},
            {val: '4', sub: 'GHI'}, {val: '5', sub: 'JKL'}, {val: '6', sub: 'MNO'}, {val: '-', op: true},
            {val: '7', sub: 'PQRS'}, {val: '8', sub: 'TUV'}, {val: '9', sub: 'WXYZ'}, {val: '*', op: true},
            {val: 'backspace', sub: ''}, {val: '0', sub: ''}, {val: '=', eq: true}, {val: '/', op: true}
          ].map((key, i) => (
            <button
              key={i}
              onClick={() => handleKeyPress(key.val)}
              className={`h-16 flex flex-col items-center justify-center rounded-2xl transition-all duration-100 active:scale-90
                ${key.op ? 'bg-white/40 text-phonepe-purple text-2xl font-bold' : ''}
                ${key.eq ? 'bg-phonepe-purple text-white text-3xl font-bold shadow-lg' : ''}
                ${!key.op && !key.eq ? 'bg-white text-gray-800 shadow-sm' : ''}
              `}
            >
              {key.val === 'backspace' ? (
                <Delete className="w-7 h-7 text-gray-400" />
              ) : (
                <>
                  <span className={key.eq ? 'mb-0' : 'text-2xl font-bold'}>{key.val}</span>
                  {key.sub && <span className="text-[9px] font-bold text-gray-400 -mt-1">{key.sub}</span>}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Action Button - Real PhonePe Style */}
        <div className="px-4 pb-6 pt-2">
          <button
            onClick={handleProceed}
            disabled={status !== 'idle' || (!amount && !hasOperator)}
            className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center tracking-widest
              ${status === 'processing' ? 'bg-phonepe-purple/60' : 'bg-phonepe-purple active:bg-purple-900'}
              ${(!amount && !hasOperator) ? 'bg-gray-400 cursor-not-allowed shadow-none' : ''}
            `}
          >
            {status === 'processing' ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : hasOperator ? (
              'CALCULATE TOTAL'
            ) : (
              'PROCEED TO PAY'
            )}
          </button>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">100% Safe & Secure Payments</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Safe Indicator */}
      <div className="h-2 bg-[#f0f3f7] w-full flex justify-center items-end pb-1">
         <div className="w-24 h-1.5 bg-gray-300/50 rounded-full" />
      </div>
    </div>
  );
};

export default App;
