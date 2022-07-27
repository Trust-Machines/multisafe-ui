import {useAppDetails} from '@micro-stacks/react';
import {getBrowser, getWalletInstallUrl} from 'micro-stacks/connect';
import {useAtom} from 'jotai';
import {showNoWalletAtom} from '../../store/ui';


export const InstallWalletDialog = () => {
    const {appName} = useAppDetails();
    const browser = getBrowser();
    const installUrl = getWalletInstallUrl(browser);

    const [isOpen, setIsOpen] = useAtom(showNoWalletAtom)

    if (!isOpen) return null;

    return (
        <dialog style={{zIndex: 9999}} open>
            <h2>No wallet found!</h2>
            <p>
                You’ll need a wallet to use {appName ?? ''}. A wallet gives you access Stacks apps,
                your account, and your NFTs.
            </p>
            <p>
                <a
                    href={installUrl}
                    target='_blank'
                >
                    {browser === 'Mobile'
                        ? 'Download Xverse, the mobile wallet for Stacks'
                        : 'Install the Hiro Web Wallet, a web extension'}
                </a>
            </p>
            <form
                method='dialog'
                onSubmit={() => {
                    setIsOpen(false)
                }}
            >
                <button>Dismiss</button>
            </form>
        </dialog>
    );
};
