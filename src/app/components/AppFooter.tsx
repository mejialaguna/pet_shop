
export default function AppFooter() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className='border-t border-white mt-auto mb-3 pt-2'>
      <small className='opacity-50'>&copy; {currentYear} JLML.</small>
    </footer>
  );
}